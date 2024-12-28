"use effect";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/router";
import Link from "next/link";

const PaymentSuccess: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Get payment details from the router or state
    const { tx_ref, userId, amount } = router.query;

    if (tx_ref && userId && amount) {
      // Call the API to create the order and clear the cart
      fetch("/api/payment-success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tx_ref,
          userId,
          amount,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            console.log("Order created and cart cleared successfully");
          } else {
            console.error("Error creating order:", data.error);
          }
        })
        .catch((err) => console.error("Error:", err));
    }
  }, [router.query]);

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
              Congrats on your purchase. Your payment was successfully processed.
              We hope you enjoy the product.
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
