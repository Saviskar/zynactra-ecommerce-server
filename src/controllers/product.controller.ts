import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { sendResponse } from '../utils/ApiResponse';

export class ProductController {
    static async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const products = await ProductService.getAllProducts();
            sendResponse(res, 200, products);
        } catch (error) {
            next(error);
        }
    }
}
