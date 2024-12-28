// pages/api/create-order.ts
import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";

export async function POST(req: Request) {
  try {
    // Parse request body to get transaction reference, userId, and amount
    const body = await req.json();
    const { tx_ref, userId, amount } = body;

    // Validate that all required fields are provided
    if (!tx_ref || !userId || !amount) {
      return new Response("Missing required data", { status: 400 });
    }

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

    // Return success response after creating the order and clearing the cart
    return new Response(
      JSON.stringify({ message: "Order created and cart cleared successfully", order }),
      { status: 200 }
    );
  } catch (error) {
    // Log and handle errors
    console.error("Error creating order or clearing cart:", error);
    const errorMessage = (error as Error).message;
    return new Response(
      JSON.stringify({ error: "Error creating order or clearing cart", details: errorMessage }),
      { status: 500 }
    );
  }
}
