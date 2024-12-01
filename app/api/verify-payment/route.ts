import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const txRef = searchParams.get('tx_ref');

  if (!txRef) {
    return NextResponse.json({ error: 'Transaction reference not found' }, { status: 400 });
  }

  try {
    // Call PayChangu API to verify the payment status
    const response = await fetch(`https://api.paychangu.com/verify-payment/${txRef}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const data = await response.json();

    if (data.status === 'success') {
      return NextResponse.redirect('/payment/success');
    } else {
      return NextResponse.redirect('/payment/failed');
    }
  } catch (error) {
    // Narrow the error type to `Error`
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // If not an `Error` instance, handle accordingly
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}
