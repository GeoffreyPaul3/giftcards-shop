import prisma from "@/app/lib/db";
import { redis } from "@/app/lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tx_ref } = req.body;

  if (!tx_ref) {
    return res.status(400).json({ error: "Missing transaction reference" });
  }

  try {
    const { data: transaction } = await axios.get(`https://api.paychangu.com/verify-payment/${tx_ref}`, {
      headers: {
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        Accept: "application/json",
      },
    });

    // Create an order in the database
    await prisma.order.create({
      data: {
        amount: transaction.amount,
        status: transaction.status,
        userId: transaction.metadata?.userId,
        transactionId: transaction.transactionId,
        paymentMethod: transaction.paymentMethod,
      },
    });

    // Clear the user's cart in Redis
    await redis.del(`cart-${transaction.metadata?.userId}`);

    res.status(200).json({ status: "success" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Order creation failed" });
  }
}
