import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";

const PaymentSuccess: React.FC = () => {

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[350px] shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="p-6">
          <div className="w-full flex justify-center">
            <Check className="w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
          </div>

          <div className="mt-3 text-center sm:mt-5 w-full">
            <h3 className="text-lg leading-6 font-medium">
              Payment Successfull
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Congrats on your purchase. Your payment was succesfully processed. We hope
              you enjoy the product.
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