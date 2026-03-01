import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { authMiddleware } from '../middlewares/auth.middleware';
import { CheckoutRequestSchema } from '../models/order.model';

const router = Router();

router.post(
    '/checkout',
    authMiddleware,
    validateRequest(CheckoutRequestSchema),
    OrderController.checkout
);

export default router;
