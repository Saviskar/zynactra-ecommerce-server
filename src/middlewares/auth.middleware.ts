import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';

// Extend Express Request to include user payload
declare global {
    namespace Express {
        interface Request {
            user?: {
                userId: number;
                email: string;
            };
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AppError('Not authorized, no token provided', 401, 'UNAUTHORIZED');
        }

        const token = authHeader.split(' ')[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; email: string };
            req.user = decoded;
            next();
        } catch (err) {
            throw new AppError('Not authorized, invalid token', 401, 'UNAUTHORIZED');
        }
    } catch (error) {
        next(error);
    }
};
