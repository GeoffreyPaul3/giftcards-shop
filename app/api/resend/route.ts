import { EmailTemplate } from '@/app/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    // Parse the incoming request body
    const { firstName, email } = await req.json();

    // Check if the required fields are present
    if (!firstName || !email) {
      return new Response(
        JSON.stringify({ error: 'Missing firstName or email' }),
        { status: 400 } // Bad Request status
      );
    }

    // Send the email using Resend API
    const data = await resend.emails.send({
      from: 'tconnect <contact@tconnect.store>', // Your sender address
      to: [email], // Recipient's email
      subject: 'Welcome to Our Service!', // Email subject
      react: EmailTemplate({ firstName }), // React-based email template
    });

    // Return the success response
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error sending email:', error);

    // Return a generic error response
    return new Response(
      JSON.stringify({ error: 'Failed to send email' }),
      { status: 500 } // Internal Server Error status
    );
  }
}
