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
    return new Response("Webhook signature verification failed", { status: 400 });
  }

  let event;
  try {
    event = JSON.parse(body);
  } catch {
    return new Response("Invalid JSON payload", { status: 400 });
  }

  switch (event.status) {
    case "success": {
      const { amount, status, reference, metadata } = event;

      // Create an order in the database
      await prisma.order.create({
        data: {
          amount: parseFloat(amount),
          status,
          userId: metadata?.userId,
          transactionId: reference,
          paymentMethod: "PayChangu",
        },
      });

      // Clear the user's cart in Redis
      await redis.del(`cart-${metadata?.userId}`);

      break;
    }
    default: {
      console.log("Unhandled event type:", event.status);
    }
  }

  return new Response(null, { status: 200 });
}