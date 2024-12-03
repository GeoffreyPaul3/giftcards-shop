"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Spinner from "@/app/components/Spinner";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";

type Props = {
  searchParams: {
    tx_ref: string;
  };
};

const PaymentConfirmation = ({}: Props) => {
  const params = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  useEffect(() => {
    const handlePaymentCallBack = async () => {
      const tx_ref = params?.get("tx_ref");

      if (tx_ref) {
        try {
          const { data } = await axios.get(
            `/api/verify-payment?tx_ref=${tx_ref}`
          );

          if (data.status === "success") {
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
  }, [params]);

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
