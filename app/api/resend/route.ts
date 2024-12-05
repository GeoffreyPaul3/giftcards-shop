
import { EmailTemplate } from '@/app/components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { firstName, email } = await req.json();


    const { data, error } = await resend.emails.send({
      from: 'tconnect <contact@tconnect.store>',
      to: [email],
      subject: 'Welcome to Our Service!',
      react: EmailTemplate({ firstName }), 
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
  }
}

