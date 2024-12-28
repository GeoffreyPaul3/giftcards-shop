'use client'; // This ensures the component runs on the client side

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import Link from "next/link";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState<string | null>(null); // State for error handling
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // State for success

  useEffect(() => {
    // Ensure router is ready and query parameters are available
    if (router.isReady) {
      const { tx_ref, userId, amount } = router.query;

      // Check if all query parameters are available
      if (tx_ref && userId && amount) {
        // Start the loading state
        setIsLoading(true);
        setError(null);

        // Make the API request
        fetch("/api/payment-success", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tx_ref, userId, amount }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              setIsPaymentSuccessful(true); // Set success state
            } else {
              setError("Error creating order: " + data.error); // Set error message
            }
          })
          .catch((err) => {
            setError("Error: " + err.message); // Handle fetch error
          })
          .finally(() => {
            setIsLoading(false); // End loading state
          });
      } else {
        setIsLoading(false); // End loading if parameters are missing
        setError("Missing required parameters.");
      }
    }
  }, [router.isReady, router.query]);

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px] shadow-lg hover:shadow-2xl">
        <div className="p-6">
          {isLoading ? (
            <div className="text-center">
              <p className="text-sm">Processing payment...</p>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">
              <p className="text-sm">{error}</p>
            </div>
          ) : isPaymentSuccessful ? (
            <>
              <div className="w-full flex justify-center">
                <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
              </div>
              <div className="mt-3 text-center sm:mt-5 w-full">
                <h3 className="text-lg leading-6 font-medium">Payment Successful</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Congrats on your purchase. Your payment was successfully processed.
                  We hope you enjoy the product.
                </p>
                <Button asChild className="w-full mt-5 sm:mt-6">
                  <Link href="/my-orders">View Your Order</Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-sm">Unexpected error occurred. Please try again later.</p>
            </div>
          )}
        </div>
      </Card>
    </section>
  );
};

export default PaymentSuccess;
