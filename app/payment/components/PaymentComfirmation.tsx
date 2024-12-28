// PaymentConfirmation.tsx
"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";

interface PaymentConfirmationProps {
  tx_ref: string;
}

const PaymentConfirmation = ({ tx_ref }: PaymentConfirmationProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const handlePaymentCallBack = async () => {
      if (tx_ref) {
        try {
          // Request to verify the payment status from the backend API
          const { data } = await axios.get(`/api/verify-payment?tx_ref=${tx_ref}`);

          console.log("Payment verification data:", data); // Log the data for debugging

          if (data.status === "success") {
            // If the payment is successful, proceed to create the order and clear the cart
            await axios.post(`/api/create-order`, {
              tx_ref,
              userId: data.transaction.metadata?.userId, // Assuming metadata contains userId
              amount: data.transaction.amount,
            });

            setStatus("success");
          } else {
            console.error("Payment verification failed:", data.message || "Unknown error");
            setStatus("failed");
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          setStatus("failed");
        }
      } else {
        console.error("Missing required payment parameters.");
        setStatus("failed");
      }
    };

    handlePaymentCallBack();
  }, [tx_ref]);

  if (status === "loading") {
    return (
      <>
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <Spinner size={40} color="white" />
        </div>
      </>
    );
  } else if (status === "success") {
    return (
      <div className="mt-4">
        <PaymentSuccess />
      </div>
    );
  } else {
    return (
      <div className="mt-4">
        <PaymentFailed />
      </div>
    );
  }
};

export default PaymentConfirmation;
