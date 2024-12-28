import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { tx_ref, userId, amount } = await req.json();

  // Validation check for necessary fields
  if (!tx_ref || !userId || !amount) {
    return NextResponse.json({ error: "Missing required data" }, { status: 400 });
  }

  try {
    // Create order in the database
    const order = await prisma.order.create({
      data: {
        amount: parseFloat(amount),
        status: "success", // Assuming the payment is successful
        userId,
        transactionId: tx_ref,
        paymentMethod: "PayChangu",
      },
    });

    // Clear the user's cart in Redis
    const cartKey = `cart-${userId}`;
    await redis.del(cartKey); // Cart is cleared

    // Return success with order details
    return NextResponse.json({ status: "success", order });
  } catch (error) {
    console.error("Error processing payment and clearing cart:", error);
    return NextResponse.json({ error: "Error processing payment and clearing cart" }, { status: 500 });
  }
}
