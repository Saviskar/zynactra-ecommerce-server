import { Request, Response, NextFunction } from 'express';
import { CheckoutService } from '../services/checkout.service';
import { sendResponse } from '../utils/ApiResponse';

export class OrderController {
    static async checkout(req: Request, res: Response, next: NextFunction) {
        try {
            // Ensure user exists on request (from auth middleware)
            const userId = req.user!.userId;

            const result = await CheckoutService.processCheckout(userId, req.body.items);
            sendResponse(res, 201, result);
        } catch (error) {
            next(error);
        }
    }
}
