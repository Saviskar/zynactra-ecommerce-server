import { db } from '../config/db';
import { User } from '../models/user.model';

export class UserRepository {
    static async findByEmail(email: string): Promise<User | undefined> {
        return db<User>('users').where({ email }).first();
    }

    static async create(user: Omit<User, 'id' | 'created_at'>): Promise<User> {
        const [createdUser] = await db<User>('users').insert(user).returning('*');
        return createdUser;
    }
}
