import app from './app';
import dotenv from 'dotenv';
import { db } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Optionally test the database connection here
        await db.raw('SELECT 1');
        console.log('Connected to PostgreSQL successfully.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
