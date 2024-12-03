// pages/api/verify-payment.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse

  
) 


{
  console.log("error")
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tx_ref } = req.query;

  if (!tx_ref || typeof tx_ref !== "string") {
    return res
      .status(400)
      .json({ error: "Missing or invalid transaction reference" });
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

    res.status(200).json(response.data);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    res.status(500).json({ error: "Payment verification failed" });
  }
}