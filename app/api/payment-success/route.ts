import { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/app/lib/redis";
import prisma from "@/app/lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Ensure the method is POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tx_ref, userId, amount } = req.body;

  // Validation check for necessary fields
  if (!tx_ref || !userId || !amount) {
    return res.status(400).json({ error: "Missing required data" });
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
    return res.status(200).json({ status: "success", order });
  } catch (error) {
    console.error("Error processing payment and clearing cart:", error);
    return res
      .status(500)
      .json({ error: "Error processing payment and clearing cart" });
  }
}
