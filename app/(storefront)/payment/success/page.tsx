'use client'

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import Link from "next/link";

export default function SuccessRoute() {
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [paymentMessage, setPaymentMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  useEffect(() => {
    // Extract query parameters from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");  // Either 'success' or 'failed'
    const txRef = urlParams.get("tx_ref");   // Transaction reference ID

    if (status && txRef) {
      if (status === "success") {
        setIsSuccess(true);
        setPaymentStatus("Payment was successful!");
        setPaymentMessage("Congrats on your purchase. We hope you enjoy your product.");
      } else {
        setIsSuccess(false);
        setPaymentStatus("Payment failed");
        setPaymentMessage("Something went wrong with your payment. Please try again.");
      }
    }
  }, []);

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px]">
        <div className="p-6">
          <div className="w-full flex justify-center">
            {/* Conditionally render success or failure icon */}
            {isSuccess === true ? (
              <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
            ) : (
              <X className="w-12 h-12 rounded-full bg-red-500/30 text-red-500 p-2" />
            )}
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              {paymentStatus || "Processing payment..."}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {paymentMessage || "We are processing your payment. Please wait."}
            </p>

            <Button asChild className="w-full mt-5 sm:mt-6">
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </Card>
    </section>
  );
}
