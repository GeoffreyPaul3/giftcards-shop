import { NextResponse } from "next/server";
import prisma from "@/app/lib/db"; // Prisma client
import { redis } from "@/app/lib/redis"; // Redis client

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { tx_ref, userId, amount } = await req.json();

    // Validation checks
    if (
      !tx_ref ||
      !userId ||
      !amount ||
      isNaN(amount) ||
      parseFloat(amount) <= 0
    ) {
      return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    }

    // Ensure amount is a valid integer
    const roundedAmount = Math.round(parseFloat(amount));

    // Create order in the database
    const order = await prisma.order.create({
      data: {
        amount: roundedAmount, // Rounded to ensure it's an integer
        status: "success", // Mark payment as successful
        userId,
        transactionId: tx_ref,
        paymentMethod: "PayChangu", // Adjust according to your needs
      },
    });

    // Clear the user's cart from Redis after successful payment
    const cartKey = `cart-${userId}`;
    try {
      await redis.del(cartKey); // Clear cart after successful payment
    } catch (redisError) {
      if (redisError instanceof Error) {
        console.error("Error clearing Redis cart:", redisError.message);
      } else {
        console.error("Error clearing Redis cart:", redisError);
      }
    }

    // Return success response with the created order
    return NextResponse.json({ status: "success", order });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error creating order and clearing cart:", error.message);
    console.error("Stack trace:", error.stack);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
