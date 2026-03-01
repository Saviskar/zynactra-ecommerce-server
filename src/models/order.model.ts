import { z } from 'zod';

export const CheckoutRequestSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                product_id: z.number().int().positive(),
                quantity: z.number().int().positive(),
            })
        ).min(1, 'Cart cannot be empty'),
    }),
});

export interface Order {
    id: number;
    user_id: number;
    total_amount: number;
    status: 'PENDING' | 'COMPLETED' | 'CANCELLED';
    created_at: Date;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price_at_purchase: number;
}
