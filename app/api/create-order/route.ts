import { NextResponse } from "next/server";
import prisma from "@/app/lib/db"; // Prisma client
import { redis } from "@/app/lib/redis"; // Redis client

export async function GET(req: Request) {
  try {
    // Extract tx_ref from the query string (URL)
    const url = new URL(req.url);
    const tx_ref = url.searchParams.get("tx_ref"); // tx_ref is passed in the URL query string

    if (!tx_ref) {
      return NextResponse.json(
        { message: "tx_ref is required" },
        { status: 400 }
      );
    }

    // Fetch the order details using tx_ref from the database (use findFirst instead of findUnique)
    const orderDetails = await prisma.order.findFirst({
      where: { transactionId: tx_ref }, // Use findFirst to query based on transactionId
    });

    // If order details do not exist
    if (!orderDetails) {
      return NextResponse.json(
        { message: "Order not found for the provided transaction reference." },
        { status: 404 }
      );
    }

    const { userId, amount } = orderDetails; // Extract userId and amount from the order

    // Validate the order details (ensure the necessary fields are valid)
    if (!userId || !amount) {
      return NextResponse.json(
        { message: "Invalid order details" },
        { status: 400 }
      );
    }

    // Mark the payment as successful by updating the order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderDetails.id }, // Use id as the unique identifier to update the order
      data: {
        status: "success", // Mark payment as successful
      },
    });

    // Clear the user's cart from Redis after successful payment
    const cartKey = `cart-${userId}`;
    try {
      await redis.del(cartKey); // Clear cart after successful payment
    } catch (redisError: unknown) {
      if (redisError instanceof Error) {
        console.error("Error clearing Redis cart:", redisError.message);
      } else {
        console.error("Unknown error clearing Redis cart");
      }
    }

    // Return the success response with the updated order
    return NextResponse.json({ status: "success", updatedOrder });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        "Error processing payment and clearing cart:",
        error.message
      );
      console.error("Stack trace:", error.stack);
    } else {
      console.error("Unknown error occurred");
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
