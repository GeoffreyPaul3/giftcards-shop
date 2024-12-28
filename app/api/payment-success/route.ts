import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { tx_ref, userId, amount } = await req.json();

    // Validation check for necessary fields
    if (!tx_ref || !userId || !amount) {
      return NextResponse.json(
        { error: "Missing required data" },
        { status: 400 }
      );
    }

    // Parse amount and validate it
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        amount: parsedAmount,
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
    return NextResponse.json({
      status: "success",
      message: "Payment successfully processed",
      order,
    });
  } catch (error) {
    // Log the error for better diagnostics
    console.error("Error processing payment and clearing cart:", error);

    // Return a generic error message to the client
    return NextResponse.json(
      { error: "Error processing payment and clearing cart" },
      { status: 500 }
    );
  }
}
