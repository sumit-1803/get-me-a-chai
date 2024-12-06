import dbConnect from '../../db/connectDB'; // Utility function to connect to MongoDB
import User from '../../models/User'; // Import the User model
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 

// Connect to the database before handling requests
dbConnect();

const JWT_SECRET = process.env.JWT_SECRET; 

export async function GET(req) {
  try {
    // Get the token directly from the Authorization header
    const authHeader = req.headers.get('authorization');

    if (!authHeader) {
      console.error('Authorization token is missing.');
      return NextResponse.json({ message: 'Authorization token is missing' }, { status: 401 });
    }

    // Remove the "Bearer " prefix if present
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    // Decode the token to extract the email
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.email) {
      console.error('Invalid or malformed token.');
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    const email = decoded.email;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Return only the fields needed for the dashboard
    const { name, username, profilePicture, coverPicture, razorpayId, razorpaySecret } = user;
    return NextResponse.json({ name, email, username, profilePicture, coverPicture, razorpayId, razorpaySecret }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}


export async function POST(req) {
  try {
    const { email, name, username, profilePicture, coverPicture, razorpayId, razorpaySecret } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    // Update the user document with the new dashboard details
    const user = await User.findOneAndUpdate(
      { email }, // Match by email
      {
        name,
        username,
        profilePicture,
        coverPicture,
        razorpayId,
        razorpaySecret,
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error updating user data:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}


