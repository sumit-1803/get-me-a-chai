import User from '../../models/User'; // Import the User model
import connectDB from '../../db/connectDB';

export async function GET(req) {
    try {
      await connectDB();
      // Fetch all user data from the database
      const users = await User.find({});
  
      // Return the user data as JSON
      return new Response(JSON.stringify(users), { status: 200 });
    } catch (error) {
      console.error('Error fetching users:', error.message);
      return new Response(
        JSON.stringify({ message: 'Server error', error: error.message }),
        { status: 500 }
      );
    }
  }
  