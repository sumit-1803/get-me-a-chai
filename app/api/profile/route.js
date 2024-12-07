import User from '../../models/User'; // Import the User model

export async function GET(req) {
  try {
    // Extract the 'username' from the query string
    const { searchParams } = new URL(req.url);
    const username = searchParams.get('username');

    if (!username) {
      return new Response(
        JSON.stringify({ message: 'Username is required' }),
        { status: 400 }
      );
    }

    // Fetch user details from the database using the User model
    const user = await User.findOne({ username });

    if (!user) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    // Log the user data for debugging
    console.log(user);

    // Return only the necessary fields for the dashboard
    const { name, email, username: userName, profilePicture, coverPicture, razorpayId, razorpaySecret, numOfPayments, raisedMoney } = user;

    // Save the updated user
    await user.save();

    return new Response(
      JSON.stringify({
        name,
        email,
        username: userName,
        profilePicture,
        coverPicture,
        razorpayId,
        razorpaySecret,
        numOfPayments,
        raisedMoney
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    return new Response(
      JSON.stringify({ message: 'Server error', error: error.message }),
      { status: 500 }
    );
  }
}
