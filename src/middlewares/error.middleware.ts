import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';

export const errorHandler = (
    err: Error | AppError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500;
    let message = 'Internal Server Error';
    let errorCode = 'INTERNAL_ERROR';

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
        errorCode = err.errorCode || 'APP_ERROR';
    } else {
        console.error('Unhandled Error:', err.message);
        console.error(err.stack);
        message = err.message || 'Internal Server Error';
    }

    res.status(statusCode).json({
        success: false,
        error: {
            message,
            code: errorCode
        }
    });
};
