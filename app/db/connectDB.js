import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        console.log('Already connected to MongoDB');
        return;
    }
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;
