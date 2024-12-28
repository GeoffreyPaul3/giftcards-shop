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
          // Verify the payment using the tx_ref
          const { data } = await axios.get(`/api/verify-payment?tx_ref=${tx_ref}`);

          if (data.status === "success") {
            // When the payment is verified, trigger order creation and cart clearing
            await handleOrderAndCartUpdate(tx_ref);
            setStatus("success");
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
  }, [tx_ref]);

  const handleOrderAndCartUpdate = async (tx_ref: string) => {
    try {
      // Call backend API to handle order creation and cart clearing
      const response = await axios.post("/api/paychangu", {
        tx_ref,
        status: "success", // Simulate success event for the webhook logic
      });

      if (response.status === 200) {
        console.log("Order created and cart cleared successfully.");
      } else {
        console.error("Error during order creation or cart clearing.");
      }
    } catch (error) {
      console.error("Error updating order and clearing cart:", error);
    }
  };

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
