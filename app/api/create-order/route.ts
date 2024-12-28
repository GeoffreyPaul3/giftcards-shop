import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/app/lib/db"; // Prisma client
import { redis } from "@/app/lib/redis"; // Redis client

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { tx_ref, userId, amount } = req.body;

  try {
    // Validation checks
    if (!tx_ref || !userId || !amount || isNaN(amount)) {
      return res.status(400).json({ message: 'Invalid data' });
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

    return res.status(200).json({ status: 'success', order });
  } catch (error) {
    console.error('Error creating order and clearing cart:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
