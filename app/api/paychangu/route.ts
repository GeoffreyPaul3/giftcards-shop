import prisma from "@/app/lib/db";
import { verifyTransaction } from "@/app/lib/payment-helpers";
import { redis } from "@/app/lib/redis";
import type { LevelCallbackPayload } from "@/types/paychangu";

export async function POST(request: Request) {
  try {
    // Get raw text from the request and parse it as the Paychangu payload
    const text = await request.text();
    const payload: LevelCallbackPayload = JSON.parse(text);

    // Verify the transaction with Paychangu
    const verifiedStatus = await verifyTransaction(payload.tx_ref);
    if (verifiedStatus !== "success") {
      return new Response("Transaction verification failed", { status: 400 });
    }

    // Proceed with processing the webhook payload
    // Example: Store order details in the database
    await prisma.order.create({
      data: {
        amount: payload.amount,            // Use the amount from the Paychangu payload
        status: payload.status,            // Status from Paychangu
        userId: payload.metadata?.userId,  
      },
    });

    // Clear the user's cart from Redis after successful payment
    await redis.del(`cart-${payload.metadata?.userId}`);

    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      });
    }
    return new Response("Unknown Webhook error", { status: 400 });
  }
}
