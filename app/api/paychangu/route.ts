import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import axios from "axios";

// Function to verify Paychangu payment
async function verifyTransaction(tx_ref: string) {
  try {
    const response = await axios.get(`https://api.paychangu.com/verify-payment/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        Accept: "application/json",
      },
    });

    return response.data; // Return the full data payload from Paychangu
  } catch (error) {
    console.error("Payment verification error:", error);
    throw new Error("Failed to verify payment");
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();  // Get the JSON payload
    const tx_ref = body.tx_ref;     // Extract `tx_ref` from the request body
    const userId = body.metadata?.userId; // Assuming `userId` is passed in the metadata

    if (!tx_ref || !userId) {
      return new Response("Missing tx_ref or userId", { status: 400 });
    }

    // Verify the payment via Paychangu API
    const verificationResult = await verifyTransaction(tx_ref);

    if (verificationResult.data.status === "success") {
      // If the transaction is successful, create an order in the database
      await prisma.order.create({
        data: {
          amount: verificationResult.data.amount,  
          status: verificationResult.data.status,  
          userId,                                  
        },
      });

      // Log cart before deletion
      const cart = await redis.get(`cart-${userId}`);
      console.log(`Current cart for user ${userId}:`, cart);

      // Clear the user's cart in Redis
      await redis.del(`cart-${userId}`);

      // Log after deletion
      console.log(`Cart for user ${userId} deleted`);

      return new Response("Payment successful, cart cleared", { status: 200 });
    } else {
      console.error("Payment verification failed or was unsuccessful");
      return new Response("Payment verification failed", { status: 400 });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response("Error processing payment", { status: 500 });
  }
}
