import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { sendResponse } from '../utils/ApiResponse';

export class ProductController {
    static async getAllProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { search, category } = req.query;
            const products = await ProductService.getAllProducts(
                search as string | undefined,
                category as string | undefined
            );
            sendResponse(res, 200, products);
        } catch (error) {
            next(error);
        }
    }
}
