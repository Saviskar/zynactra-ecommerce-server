import { db } from '../config/db';
import { Product } from '../models/product.model';
import { Knex } from 'knex';

export class ProductRepository {
    static async findAll(search?: string, category?: string): Promise<any[]> {
        const query = db('products')
            .select(
                'products.id',
                'products.name',
                'products.description',
                'products.unit_price',
                'products.stock_qty',
                'products.is_active',
                'categories.name as category_name',
                'product_images.image_url'
            )
            .leftJoin('categories', 'products.category_id', 'categories.id')
            .leftJoin('product_images', function () {
                this.on('products.id', '=', 'product_images.product_id')
                    .andOn('product_images.is_primary', '=', db.raw('?', [true]))
            })
            .where('products.is_active', true)
            .orderBy('products.created_at', 'desc');

        if (category && category !== 'All') {
            query.where('categories.name', category);
        }

        if (search) {
            query.where('products.name', 'ilike', `%${search}%`);
        }

        return query;
    }

    static async findById(id: string, trx?: Knex.Transaction): Promise<Product | undefined> {
        const query = trx ? trx<Product>('products') : db<Product>('products');
        return query.where({ id }).first();
    }

    static async decrementStock(id: string, amount: number, trx: Knex.Transaction): Promise<number> {
        const result = await trx<Product>('products')
            .where({ id })
            .decrement('stock_qty', amount);

        return result;
    }
}
