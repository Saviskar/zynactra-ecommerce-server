import { Response } from 'express';

export const sendResponse = <T>(
    res: Response,
    statusCode: number,
    data?: T
): void => {
    res.status(statusCode).json({
        success: true,
        data
    });
};
