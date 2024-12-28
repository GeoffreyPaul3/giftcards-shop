// pages/api/payment-success.ts
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tx_ref, userId, amount } = req.body;

  if (!tx_ref || !userId || !amount) {
    return res.status(400).json({ error: "Missing required data" });
  }

  try {
    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        amount: parseFloat(amount),
        status: "success",
        userId,
        transactionId: tx_ref,
        paymentMethod: "PayChangu",
      },
    });

    // Clear the user's cart in Redis
    const cartKey = `cart-${userId}`;
    await redis.del(cartKey); // Clears the cart

    return res.status(200).json({ status: "success", order });
  } catch (error) {
    console.error("Error processing payment:", error);
    return res
      .status(500)
      .json({ error: "Error processing payment and clearing cart" });
  }
}
