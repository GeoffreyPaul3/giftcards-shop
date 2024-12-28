// pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tx_ref } = req.query;

  if (!tx_ref || typeof tx_ref !== "string") {
    return res.status(400).json({ error: "Missing or invalid transaction reference" });
  }

  try {
    const response = await axios.get(
      `https://api.paychangu.com/verify-payment/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
          Accept: "application/json",
        },
      }
    );

    if (response.data.status === "success") {
      res.status(200).json({ status: "success", transaction: response.data });
    } else {
      res.status(400).json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment verification failed" });
  }
}
