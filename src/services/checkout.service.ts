import { db } from '../config/db';
import { ProductRepository } from '../repositories/product.repository';
import { OrderRepository } from '../repositories/order.repository';
import { AppError } from '../utils/AppError';

interface CheckoutItem {
    product_id: number;
    quantity: number;
}

export class CheckoutService {
    static async processCheckout(userId: number, items: CheckoutItem[]) {
        // Start a database transaction
        const trx = await db.transaction();

        try {
            let totalAmount = 0;
            const orderItemsToCreate = [];

            // 1. Verify stock and calculate total amount
            for (const item of items) {
                // Lock the product row for update to prevent concurrent checkout issues
                const product = await trx('products')
                    .where({ id: item.product_id })
                    .forUpdate()
                    .first();

                if (!product) {
                    throw new AppError(`Product with ID ${item.product_id} not found`, 404, 'PRODUCT_NOT_FOUND');
                }

                if (product.stock_quantity < item.quantity) {
                    throw new AppError(`Insufficient stock for product ${product.name}`, 400, 'INSUFFICIENT_STOCK');
                }

                // Decrement stock
                await ProductRepository.decrementStock(item.product_id, item.quantity, trx);

                // Calculate item total
                const itemTotal = Number(product.price) * item.quantity;
                totalAmount += itemTotal;

                orderItemsToCreate.push({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    price_at_purchase: Number(product.price)
                });
            }

            // 2. Create the Order
            const newOrder = await OrderRepository.createOrder({
                user_id: userId,
                total_amount: totalAmount,
                status: 'COMPLETED' // Simplified for this example; in a real app this might be PENDING until payment
            }, trx);

            // 3. Create Order Items
            const orderItems = orderItemsToCreate.map(oi => ({
                ...oi,
                order_id: newOrder.id
            }));

            await OrderRepository.createOrderItems(orderItems, trx);

            // 4. Commit transaction
            await trx.commit();

            return {
                order: newOrder,
                items: orderItems
            };

        } catch (error) {
            // 5. Rollback transaction on any error
            await trx.rollback();
            throw error;
        }
    }
}
