import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import crypto from "crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("PayChangu-Signature") as string;

  // Verify the webhook signature
  const secret = process.env.PAYCHANGU_SECRET_HASH as string;
  const hash = crypto.createHmac("sha256", secret).update(body).digest("hex");

  if (hash !== signature) {
    console.error("Webhook signature verification failed");
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch (error) {
    console.error("Invalid JSON payload:", error);
    return new Response("Invalid JSON payload", { status: 400 });
  }

  switch (event.status) {
    case "success": {
      const { amount, status, reference, metadata } = event;

      try {
        // Create an order in the database
        const order = await prisma.order.create({
          data: {
            amount: parseFloat(amount),
            status,
            userId: metadata?.userId,
            transactionId: reference,
            paymentMethod: "PayChangu",
          },
        });

        console.log("Order created successfully:", order);

        // Clear the user's cart in Redis
        const cartKey = `cart-${metadata?.userId}`;
        const cartCleared = await redis.del(cartKey);

        console.log(`Cart cleared for user ${metadata?.userId}:`, cartCleared);

        // Optionally, send confirmation to the user (email/SMS/etc.)
      } catch (error) {
        console.error("Error creating order or clearing cart:", error);
        return new Response("Error creating order or clearing cart", { status: 500 });
      }

      break;
    }
    case "failed": {
      // Handle failed payment events if needed
      const { reference, metadata } = event;
      console.log(`Payment failed for transaction: ${reference} with metadata:`, metadata);

      break;
    }
    default: {
      console.log("Unhandled event type:", event.status);
    }
  }

  return new Response(null, { status: 200 });
}
