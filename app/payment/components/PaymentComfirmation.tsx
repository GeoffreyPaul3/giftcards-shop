"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams} from "next/navigation";
import axios from "axios";
// import Spinner from "@/app/components/Spinner";
import PaymentSuccess from "./PaymentSuccess";
import PaymentFailed from "./PaymentFailed";

type Props = {
  searchParams: {
    // userId: string;
    // subscriptionId: string;
    tx_ref: string;
  };
};

const PaymentConfirmation = ({}: Props) => {
  const params = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processPayment = async (paymentData: any) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}api/subscriptions`,
        {
          paymentData,
        }
      );
      setStatus("success");
    } catch (error) {
      console.error("Error in processPayment:", error);
      setStatus("failed");
    }
  };

  useEffect(() => {
    const handlePaymentCallBack = async () => {
      // const userId = params?.get("userId");
      // const subscriptionId = params?.get("subscriptionId");
      const tx_ref = params?.get("tx_ref");
      // const billing = params?.get("billing");

      if (tx_ref) {
        try {
          // const { data } = await axios.get(
          //   `https://api.paychangu.com/verify-payment/${tx_ref}`,
          //   {
          //     headers: {
          //       Authorization: `Bearer API_KEY`,
          //       Accept: "application/json",
          //     },
          //   }
          // );

          const { data } = await axios.get(
            `/api/verify-payment?tx_ref=${tx_ref}`
          );

          if (data.status === "success") {
            await processPayment({});
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
          {/* <Spinner size={40} color="white" /> */}
          Loader
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
        {/* <PaymentSuccess /> */}
      </div>
    );
  }
};

export default PaymentConfirmation;