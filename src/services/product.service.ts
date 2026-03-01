import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.model';

export class ProductService {
    static async getAllProducts(): Promise<Product[]> {
        return ProductRepository.findAll();
    }
}
