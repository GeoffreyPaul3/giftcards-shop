"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import axios from "axios";

const PaymentSuccess: React.FC = () => {
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleOrderCreationAndCartClearing = async () => {
      // Assuming that transaction data (tx_ref, userId, and amount) are stored in localStorage
      const tx_ref = localStorage.getItem("tx_ref");
      const userId = localStorage.getItem("userId");
      const amount = localStorage.getItem("amount");

      if (!tx_ref || !userId || !amount) {
        setErrorMessage("Missing required data for order creation.");
        setStatus("failed");
        return;
      }

      try {
        // Call the API to handle order creation and cart clearing
        const response = await axios.post("/api/payment-success", {
          tx_ref,
          userId,
          amount,
        });

        if (response.status === 200) {
          setStatus("success");
        } else {
          setErrorMessage("Order creation or cart clearing failed.");
          setStatus("failed");
        }
      } catch (error) {
        console.error("Error during order creation or cart clearing:", error);
        setErrorMessage("Error during order creation or cart clearing.");
        setStatus("failed");
      }
    };

    handleOrderCreationAndCartClearing();
  }, []);

  if (status === "loading") {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px] shadow-lg hover:shadow-2xl">
          <div className="p-6">
            <div className="w-full flex justify-center">
              <div className="w-12 h-12 rounded-full bg-gray-500/30 text-gray-500 p-2" />
            </div>
            <div className="mt-3 text-center sm:mt-5 w-full">
              <h3 className="text-lg leading-6 font-medium">Processing Payment...</h3>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  if (status === "failed") {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px] shadow-lg hover:shadow-2xl">
          <div className="p-6">
            <div className="w-full flex justify-center">
              <Check className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
            </div>

            <div className="mt-3 text-center sm:mt-5 w-full">
              <h3 className="text-lg leading-6 font-medium">Payment Failed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                There was an issue processing your payment. Please try again.
              </p>
              {errorMessage && <p className="mt-2 text-sm text-red-500">{errorMessage}</p>}
            </div>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px] shadow-lg hover:shadow-2xl">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">Payment Successful</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats on your purchase. Your payment was successfully processed. We hope you enjoy the product.
            </p>
            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="/my-orders">View Your Order</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PaymentSuccess;
