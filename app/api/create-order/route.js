// app/api/create-order/route.js
import Razorpay from 'razorpay';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Your Razorpay key ID from environment variables
  key_secret: process.env.RAZORPAY_KEY_SECRET, // Your Razorpay key secret from environment variables
});

export async function POST(req) {
  try {
    // Parse the incoming request body to get the amount and user details
    const { amount, userId } = await req.json();

    // Create the Razorpay order
    const order = await razorpay.orders.create({
      amount: amount, // amount in paise (100 paise = 1 INR)
      currency: 'INR',
      receipt: `receipt_${userId}`,
    });

    // Return the order details to the client
    return new Response(JSON.stringify({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return new Response(JSON.stringify({ error: 'Failed to create order' }), { status: 500 });
  }
}
