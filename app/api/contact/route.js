import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json(); // Get form data from request body

    // Create a transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or your email provider (e.g., Outlook, Yahoo)
      auth: {
        user: process.env.EMAIL_USER, // Your email address (configured in .env)
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    // Set up email data
    const mailOptions = {
      from: email, // Sender's email
      to: process.env.RECIPIENT_EMAIL, 
      subject: `New message from ${name}`,
      text: `
        You have received a new message from ${name} (${email}):
        
        Message: ${message}
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Message sent successfully!' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Error sending message.' }), {
      status: 500,
    });
  }
}
