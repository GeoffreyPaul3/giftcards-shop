import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Server component for handling payment success
const PaymentSuccess = async ({ searchParams }: { searchParams: { [key: string]: string } }) => {
  const { tx_ref, userId, amount } = searchParams;

  // Ensure all required parameters are provided
  if (!tx_ref || !userId || !amount) {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px] shadow-lg hover:shadow-2xl">
          <div className="p-6">
            <div className="text-center text-red-500">
              <p className="text-sm">Missing required parameters. Please try again.</p>
            </div>
          </div>
        </Card>
      </section>
    );
  }

  try {
    // Make an API request to process the payment
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
                  Congrats on your purchase! Your payment was successfully processed.
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
                <p className="text-sm">{data.error || "Error processing the payment."}</p>
              </div>
            </div>
          </Card>
        </section>
      );
    }
  } catch {
    return (
      <section className="w-full min-h-[80vh] flex items-center justify-center">
        <Card className="w-[350px] shadow-lg hover:shadow-2xl">
          <div className="p-6">
            <div className="text-center text-red-500">
              <p className="text-sm">An error occurred while processing the payment. Please try again later.</p>
            </div>
          </div>
        </Card>
      </section>
    );
  }
};

export default PaymentSuccess;
