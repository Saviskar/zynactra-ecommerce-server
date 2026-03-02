import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.model';

export class ProductService {
    static async getAllProducts(search?: string, category?: string): Promise<any[]> {
        return ProductRepository.findAll(search, category);
    }
}
