import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import  connectDB  from '../../../db/connectDB';
import { setCookie } from 'cookies-next'; 
import mongoose from 'mongoose';
import User from '../../../models/User';

// POST /api/auth/login
export async function POST(req) {
    try {
        const { email, password } = await req.json();

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        setCookie('token', token, { maxAge: 60 * 60 * 24, path: '/' });

        return NextResponse.json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login failed:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}