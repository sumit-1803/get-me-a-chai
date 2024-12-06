// /app/api/auth/signup/route.js
import bcrypt from 'bcryptjs';
import User from '../../../models/User'; // Adjust the path to your User model

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

    // Create new user
    const user = new User({
      email,
      password: hashedPassword,
      name,
      username,
    });

    // Save the user to the database
    await user.save();

    return new Response(JSON.stringify({ message: 'User created successfully' }), { status: 201 });
  } catch (error) {
    console.error('Error signing up user:', error);
    return new Response(JSON.stringify({ message: 'Server error' }), { status: 500 });
  }
}
