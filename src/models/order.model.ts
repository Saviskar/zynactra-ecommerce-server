import { z } from 'zod';

export const CheckoutRequestSchema = z.object({
    body: z.object({
        items: z.array(
            z.object({
                product_id: z.string().uuid(),
                quantity: z.number().int().positive(),
            })
        ).min(1, 'Cart cannot be empty'),
    }),
});

export interface Order {
    id: string;
    user_id: string;
    status: 'placed' | 'cancelled' | 'shipped' | 'delivered';
    created_at: Date;
}

export interface OrderItem {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    unit_price_at_purchase: number;
    line_total: number;
}
