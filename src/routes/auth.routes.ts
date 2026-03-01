import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { UserRegistrationSchema, UserLoginSchema } from '../models/user.model';

const router = Router();

router.post('/register', validateRequest(UserRegistrationSchema), UserController.register);
router.post('/login', validateRequest(UserLoginSchema), UserController.login);

export default router;
