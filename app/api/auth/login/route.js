import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import  connectDB  from '../../../db/connectDB';
import { setCookie } from 'cookies-next'; 
import mongoose from 'mongoose';

// POST /api/auth/login
export async function POST(req) {
    try {
      const { email, password } = await req.json(); // Get email and password from request body
  
      // Connect to the database
      await connectDB(); // Call your connectDB function to ensure a connection
  
      // Find the user by email in the database
      const user = await mongoose.model('User').findOne({ email });
  
      if (!user) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }
  
      // Compare the hashed password with the input password
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET, // Make sure to store your secret in environment variables
        { expiresIn: '1d' }
      );
  
      // Set JWT token as a cookie
      setCookie('token', token, { maxAge: 60 * 60 * 24, path: '/' });
  
      return NextResponse.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login failed:', error);
      return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
