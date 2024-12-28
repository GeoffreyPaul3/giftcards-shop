import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'; // Prisma client
import { redis } from '@/app/lib/redis'; // Redis client

export async function POST(req: Request) {
  try {
    const { tx_ref, userId, amount } = await req.json();

    // Validation checks
    if (!tx_ref || !userId || !amount || isNaN(amount) || parseFloat(amount) <= 0) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    // Create order in the database
    const order = await prisma.order.create({
      data: {
        amount: Math.round(parseFloat(amount)), // Round the amount if it's a float
        status: 'success', // Mark payment as successful
        userId,
        transactionId: tx_ref,
        paymentMethod: 'PayChangu', // Adjust according to your needs
      },
    });

    // Clear user's cart from Redis
    const cartKey = `cart-${userId}`;
    await redis.del(cartKey); // Clear cart after successful payment

    return NextResponse.json({ status: 'success', order });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating order and clearing cart:', error.message);
    console.error('Stack trace:', error.stack);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
