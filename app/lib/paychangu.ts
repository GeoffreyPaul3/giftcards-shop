import { VerificationSDK } from "paychangu-js";
import { redis } from "./redis";

export async function verifyPayment(txRef: string) {
  const verificationResponse = await VerificationSDK.verifyTransaction(txRef);

  if (verificationResponse.status === "success") {
    const transactionData = await redis.get(`transaction-${txRef}`);
    
    if (transactionData) {
      // Handle successful payment, for example:
      // 1. Update order status in the database
      // 2. Notify the user about the successful payment
      // 3. Log transaction data for auditing
      console.log("Transaction data:", transactionData);
      // Further processing...
    }
    
  } else {
    // Handle payment failure
    console.error("Payment verification failed for transaction:", txRef);
    // Possibly log the failure or notify the user/admin
  }
}
