import { db } from '../config/db';
import { Order, OrderItem } from '../models/order.model';
import { Knex } from 'knex';

export class OrderRepository {
    static async createOrder(order: Omit<Order, 'id' | 'created_at'>, trx: Knex.Transaction): Promise<Order> {
        const [createdOrder] = await trx<Order>('orders').insert(order).returning('*');
        return createdOrder;
    }

    static async createOrderItems(orderItems: Omit<OrderItem, 'id'>[], trx: Knex.Transaction): Promise<OrderItem[]> {
        const createdItems = await trx<OrderItem>('order_items').insert(orderItems).returning('*');
        return createdItems;
    }
}
