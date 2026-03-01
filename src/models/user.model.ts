import { z } from 'zod';

export const UserRegistrationSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters long'),
        name: z.string().min(2, 'Name must be at least 2 characters long'),
    }),
});

export const UserLoginSchema = z.object({
    body: z.object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(1, 'Password is required'),
    }),
});

export interface User {
    id: number;
    email: string;
    password_hash: string;
    name: string;
    created_at: Date;
}
