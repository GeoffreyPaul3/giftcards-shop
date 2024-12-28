import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

// Fetch payment details and handle the response in a server component
const PaymentSuccess = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { tx_ref, userId, amount } = searchParams;

  // Check if all required query parameters are available
  if (!tx_ref || !userId || !amount) {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px] shadow-lg hover:shadow-2xl">
          <div className="p-6">
            <div className="text-center text-red-500">
              <p className="text-sm">Missing required parameters.</p>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  try {
    // Make the API request to process the payment
    const response = await fetch("/api/payment-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tx_ref, userId, amount }),
    });
    const data = await response.json();

    if (data.status === "success") {
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
    } else {
      return (
        <section className="w-full min-h-[80vh] flex items-center justify-center">
          <Card className="w-[350px] shadow-lg hover:shadow-2xl">
            <div className="p-6">
              <div className="text-center text-red-500">
                <p className="text-sm">{data.error || "Error creating order."}</p>
              </div>
            </div>
          </Card>
        </section>
      );
    }
  } catch (err) {
    console.error(err);
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px] shadow-lg hover:shadow-2xl">
          <div className="p-6">
            <div className="text-center text-red-500">
              <p className="text-sm">An error occurred while processing the payment.</p>
            </div>
          </div>
        </Card>
      </section>
    );
  }
};

export default PaymentSuccess;
