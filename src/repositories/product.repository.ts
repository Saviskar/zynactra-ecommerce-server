import { db } from '../config/db';
import { Product } from '../models/product.model';
import { Knex } from 'knex';

export class ProductRepository {
    static async findAll(): Promise<Product[]> {
        return db<Product>('products').select('*');
    }

    static async findById(id: number, trx?: Knex.Transaction): Promise<Product | undefined> {
        const query = trx ? trx<Product>('products') : db<Product>('products');
        return query.where({ id }).first();
    }

    static async decrementStock(id: number, amount: number, trx: Knex.Transaction): Promise<number> {
        const result = await trx<Product>('products')
            .where({ id })
            .decrement('stock_quantity', amount);

        return result;
    }
}
