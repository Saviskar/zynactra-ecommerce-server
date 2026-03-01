import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../models/user.model';
import { AppError } from '../utils/AppError';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key';
const JWT_EXPIRES_IN = '1d';

export class UserService {
    static async register(data: any): Promise<{ user: Omit<User, 'password_hash'>; token: string }> {
        const existingUser = await UserRepository.findByEmail(data.email);
        if (existingUser) {
            throw new AppError('Email already in use', 400, 'EMAIL_EXISTS');
        }

        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(data.password, salt);

        const newUser = await UserRepository.create({
            email: data.email,
            password_hash
        });

        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        const { password_hash: _, ...userWithoutPassword } = newUser;

        return { user: userWithoutPassword, token };
    }

    static async login(data: any): Promise<{ user: Omit<User, 'password_hash'>; token: string }> {
        const user = await UserRepository.findByEmail(data.email);
        if (!user) {
            throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
        }

        const isMatch = await bcrypt.compare(data.password, user.password_hash);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: JWT_EXPIRES_IN
        });

        const { password_hash: _, ...userWithoutPassword } = user;

        return { user: userWithoutPassword, token };
    }
}
