import { z } from 'zod';

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number; // Stored as a decimal or numeric in DB, but represented as a number here
    stock_quantity: number;
    category_id?: number;
    created_at: Date;
    updated_at: Date;
}
