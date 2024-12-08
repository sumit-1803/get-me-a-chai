// /app/api/auth/signup/route.js
import bcrypt from 'bcryptjs';
import User from '../../../models/User'; // Adjust the path to your User model
import connectDB from '../../../db/connectDB';

connectDB();

export async function POST(req) {
  const { email, password, name, username } = await req.json();

  // Basic validation
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Please fill in all fields' }), { status: 400 });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    const finalProfilePicture = 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      username,
      profilePitchure: finalProfilePicture,
    });

    // Save the user to the database
    await user.save();

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error signing up user:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req) {
  const { email } = await req.json();  // Assuming username is passed in the body

  if (!email) {
    return new Response(JSON.stringify({ message: 'Username is required' }), { status: 400 });
  }

  try {
    // Connect to the database if needed (You can skip this if already connected globally)
    await connectDB();

    // Attempt to find and delete the user by username
    const user = await User.findOneAndDelete({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found or already deleted' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'User deleted successfully' }), { status: 200 });
  } catch (error) {
    console.error('Error deleting user:', error);
    return new Response(JSON.stringify({ message: 'An error occurred while deleting the user' }), { status: 500 });
  }
}