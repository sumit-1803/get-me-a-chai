import dbConnect from '../../db/connectDB'; // Utility function to connect to MongoDB
import Dashboard from '../../models/Dashboard'; // Import the Dashboard model
import { NextResponse } from 'next/server';

// Connect to the database before handling requests
dbConnect();

export async function GET(req) {
  try {
    // Find the dashboard (this will not check if the user is authenticated)
    const dashboard = await Dashboard.findOne();

    if (!dashboard) {
      return NextResponse.json({ message: 'Dashboard not found' }, { status: 404 });
    }

    return NextResponse.json(dashboard, { status: 200 });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, email, username, profilePicture, coverPicture, razorpayId, razorpaySecret } = await req.json();

    // Log the received body to verify the input data
    console.log('Request body:', req.body);

    // Create or update the dashboard (no session needed)
    const dashboard = await Dashboard.findOneAndUpdate(
      {}, // No user check, this will update the first dashboard found or create one
      { name, email, username, profilePicture, coverPicture, razorpayId, razorpaySecret },
      { new: true, upsert: true } // Create if it doesn't exist, otherwise update
    );

    console.log('Dashboard after save:', dashboard); // Log the updated dashboard

    return NextResponse.json(dashboard, { status: 200 });
  } catch (error) {
    console.error('Error creating/updating dashboard:', error);
    return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
  }
}
