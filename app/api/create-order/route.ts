import { NextResponse } from "next/server";
import prisma from "@/app/lib/db"; // Prisma client
import { redis } from "@/app/lib/redis"; // Redis client

export async function GET(req: Request) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  // Extract tx_ref from the query string (URL)
  const url = new URL(req.url);
  const tx_ref = url.searchParams.get("tx_ref");

  if (!tx_ref || typeof tx_ref !== "string") {
    return NextResponse.json(
      { error: "Missing or invalid transaction reference" },
      { status: 400 }
    );
  }

  try {
    // Fetch the order details using tx_ref from the database
    const orderDetails = await prisma.order.findFirst({
      where: { transactionId: tx_ref },
    });

    if (!orderDetails) {
      return NextResponse.json(
        { error: "Order not found for the provided transaction reference" },
        { status: 404 }
      );
    }

    const { userId, amount } = orderDetails;

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid order details" },
        { status: 400 }
      );
    }

    // Mark the payment as successful
    const updatedOrder = await prisma.order.update({
      where: { id: orderDetails.id },
      data: { status: "success" },
    });

    // Clear the user's cart from Redis after successful payment
    const cartKey = `cart-${userId}`;
    try {
      await redis.del(cartKey); // Clear cart after successful payment
    } catch (redisError: unknown) {
      console.error(
        "Error clearing Redis cart:",
        redisError instanceof Error ? redisError.message : "Unknown error"
      );
    }

    return NextResponse.json({ status: "success", updatedOrder });
  } catch (error: unknown) {
    console.error(
      "Error processing payment and clearing cart:",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
