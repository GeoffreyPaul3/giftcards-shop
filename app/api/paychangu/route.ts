import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { NextResponse } from "next/server";
import axios from "axios";

// Define POST request handler
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { tx_ref } = body;

    if (!tx_ref) {
      return NextResponse.json({ error: "Missing transaction reference" }, { status: 400 });
    }

    // Verify transaction with Paychangu
    const { data: transaction } = await axios.get(`https://api.paychangu.com/verify-payment/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        Accept: "application/json",
      },
    });

    // If transaction is successful, create an order
    if (transaction.status === "success") {
      await prisma.order.create({
        data: {
          amount: transaction.amount,
          status: transaction.status,
          userId: transaction.metadata?.userId,
          transactionId: transaction.transactionId,
          paymentMethod: transaction.paymentMethod,
        },
      });

      // Clear the user's cart from Redis
      await redis.del(`cart-${transaction.metadata?.userId}`);

      return NextResponse.json({ status: "success" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Transaction verification failed" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error verifying transaction:", error);
    return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
  }
}
