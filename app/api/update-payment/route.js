import connectDB from '../../db/connectDB';
import User from '../../models/User'; // Assuming you have a User model

export async function POST(req) {
    const { username, amountPaid } = await req.json();

    // Validate incoming data
    if (!username || !amountPaid) {
        return new Response(JSON.stringify({ message: "Missing required fields" }), { status: 400 });
    }

    try {
        // Connect to the database
        await connectDB();
        console.log('Connected to the database');

        // Find the user by username
        const user = await User.findOne({ username });
        console.log('User found:', user);

        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        // Retrieve the current values of numOfPayments and raisedMoney
        const { numOfPayments, raisedMoney } = user;

        // Log current values
        console.log('Current numOfPayments:', numOfPayments);
        console.log('Current raisedMoney:', raisedMoney);

        // Update the user's numOfPayments and raisedMoney
        user.numOfPayments = numOfPayments + 1;
        user.raisedMoney = raisedMoney + parseFloat(amountPaid);

        // Log updated values
        console.log('Updated numOfPayments:', user.numOfPayments);
        console.log('Updated raisedMoney:', user.raisedMoney);

        // Save the updated user
        await user.save();
        console.log('User saved successfully');

        // Return success response
        return new Response(JSON.stringify({ message: "User payment data updated successfully" }), { status: 200 });
    } catch (error) {
        console.error('Error updating user payment data:', error);
        return new Response(JSON.stringify({ message: "Server error" }), { status: 500 });
    }
}
