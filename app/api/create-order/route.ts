// pages/api/create-order.ts
import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";

export async function POST(req: Request) {
  const body = await req.json();
  const { tx_ref, userId, amount } = body;

  if (!tx_ref || !userId || !amount) {
    return new Response("Missing required data", { status: 400 });
  }

  try {
    // Step 1: Create an order in the database
    const order = await prisma.order.create({
      data: {
        amount: parseFloat(amount),
        status: "success", // Set to success since we're handling a successful payment
        userId: userId,
        transactionId: tx_ref,
        paymentMethod: "PayChangu", // Assuming PayChangu is used as payment method
      },
    });

    console.log("Order created successfully:", order);

    // Step 2: Clear the user's cart in Redis
    const cartKey = `cart-${userId}`;
    const cartCleared = await redis.del(cartKey);

    console.log(`Cart cleared for user ${userId}:`, cartCleared);

    return new Response("Order created and cart cleared successfully", { status: 200 });
  } catch (error) {
    console.error("Error creating order or clearing cart:", error);
    return new Response("Error creating order or clearing cart", { status: 500 });
  }
}
