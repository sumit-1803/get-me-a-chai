import mongoose from 'mongoose';

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/chai');
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default connectDB;
