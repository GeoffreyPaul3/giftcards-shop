import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Receipt, Home, ShoppingBag } from "lucide-react";
import { Card } from "@/components/ui/card";


interface PaymentSuccessProps {
  orderId?: string;
  amount?: number;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ orderId, amount }) => {
  
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount || 0);

  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center">
      <Card className="w-[400px] shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="p-8">
          {/* Success Icon */}
          <div className="w-full flex justify-center">
            <div className="relative">
              <div className="animate-ping absolute inline-flex h-12 w-12 rounded-full bg-green-400 opacity-25"></div>
              <Check className="relative w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
            </div>
          </div>

          {/* Success Message */}
          <div className="mt-6 text-center w-full">
            <h3 className="text-xl font-semibold text-green-600">
              Payment Successful!
            </h3>
            
            {/* Order Details */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4">
              {orderId && (
                <p className="text-sm text-gray-600">
                  Order ID: <span className="font-mono font-medium">{orderId}</span>
                </p>
              )}
              {amount && (
                <p className="text-sm text-gray-600 mt-1">
                  Amount Paid: <span className="font-medium">{formattedAmount}</span>
                </p>
              )}
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Thank you for your purchase! We&apos;ve sent a confirmation email with your order details.
            </p>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/my-orders" className="flex items-center justify-center gap-2">
                  <Receipt className="w-4 h-4" />
                  View Your Order
                </Link>
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                >
                  <Link href="/" className="flex items-center justify-center gap-2">
                    <Home className="w-4 h-4" />
                    Home
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full"
                >
                  <Link href="/shop" className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-4 h-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
};

export default PaymentSuccess;