import { NextResponse } from "next/server";
import prisma from "@/app/lib/db"; // Prisma client
import { redis } from "@/app/lib/redis"; // Redis client

export async function GET(req: Request) {
  try {
    // Extract tx_ref from the query string (URL)
    const url = new URL(req.url);
    const tx_ref = url.searchParams.get("tx_ref");

    if (!tx_ref) {
      return NextResponse.json({ message: "tx_ref is required", code: "TX_REF_MISSING" }, { status: 400 });
    }

    // Fetch the order details using tx_ref from the database
    const orderDetails = await prisma.order.findFirst({
      where: { transactionId: tx_ref },
    });

    if (!orderDetails) {
      return NextResponse.json({ message: "Order not found for the provided transaction reference.", code: "ORDER_NOT_FOUND" }, { status: 404 });
    }

    const { userId, amount } = orderDetails;

    if (!userId || !amount || amount <= 0) {
      return NextResponse.json({ message: "Invalid order details", code: "INVALID_ORDER_DETAILS" }, { status: 400 });
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
      console.error("Error clearing Redis cart:", redisError instanceof Error ? redisError.message : "Unknown error");
    }

    return NextResponse.json({ status: "success", updatedOrder });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error processing payment and clearing cart:", error.message);
      console.error("Stack trace:", error.stack);
    } else {
      console.error("Unknown error occurred");
    }
    return NextResponse.json({ message: "Internal server error", code: "INTERNAL_SERVER_ERROR" }, { status: 500 });
  }
}
