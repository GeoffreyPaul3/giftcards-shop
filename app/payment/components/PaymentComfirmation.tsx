"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";

interface PaymentConfirmationProps {
  tx_ref: string;
  userId: string; // Add userId prop
  amount: number; // Add amount prop
}

const PaymentConfirmation = ({ tx_ref, userId, amount }: PaymentConfirmationProps) => {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");

  useEffect(() => {
    const handlePaymentCallBack = async () => {
      if (tx_ref) {
        try {
          // First verify the payment
          const { data: verificationData } = await axios.get(`/api/verify-payment?tx_ref=${tx_ref}`);

          if (verificationData.status === "success") {
            // If payment verification is successful, process the order and clear cart
            try {
              const { data: processData } = await axios.post('/api/payment-success', {
                tx_ref,
                userId,
                amount
              });

              if (processData.status === "success") {
                setStatus("success");
              } else {
                console.error("Order processing failed");
                setStatus("failed");
              }
            } catch (processError) {
              console.error("Error processing order:", processError);
              setStatus("failed");
            }
          } else {
            console.error("Payment verification failed.");
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
  }, [tx_ref, userId, amount]);

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