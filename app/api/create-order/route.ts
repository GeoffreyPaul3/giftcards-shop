import { NextResponse } from 'next/server';
import prisma from '@/app/lib/db'; // Prisma client
import { redis } from '@/app/lib/redis'; // Redis client

export async function POST(req: Request) {
  try {
    const { tx_ref, userId, amount } = await req.json();

    // Validation checks
    if (!tx_ref || !userId || !amount || isNaN(amount)) {
      return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
    }

    // Create order in the database
    const order = await prisma.order.create({
      data: {
        amount: parseFloat(amount),
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
  } catch (error) {
    console.error('Error creating order and clearing cart:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
