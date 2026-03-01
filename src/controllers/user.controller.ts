import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { sendResponse } from '../utils/ApiResponse';

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.register(req.body);
            sendResponse(res, 201, result);
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await UserService.login(req.body);
            sendResponse(res, 200, result);
        } catch (error) {
            next(error);
        }
    }
}
