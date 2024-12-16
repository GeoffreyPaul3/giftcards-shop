import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const signature = req.headers.get("Paychangu-Signature");


  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const eventType = body?.event;
  
  switch (eventType) {
    case "payment.success": {
      const transaction = body?.data;

      await prisma.order.create({
        data: {
          amount: transaction.amount,
          status: transaction.status,
          userId: transaction.metadata?.userId,
          transactionId: transaction.transactionId,
          paymentMethod: transaction.paymentMethod,
        },
      });

      // Clear the user's cart in Redis using their user ID
      await redis.del(`cart-${transaction.metadata?.userId}`);

      break;
    }

    case "payment.failed": {
      console.error("Payment failed:", body?.data);
      break;
    }

    default: {
      console.log("Unhandled event type:", eventType);
    }
  }

  return NextResponse.json(null, { status: 200 });
}
