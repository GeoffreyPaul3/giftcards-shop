'use client';

import { addItem, buyNow } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBag, CreditCard, Loader2 } from 'lucide-react';
import { useState } from "react";

// Define the expected return type for addItem and buyNow
type ResultType = { success: boolean; message?: string };

export function ProductActions({ productId }: { productId: string }) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      const result = (await addItem(productId)) as ResultType; // Type assertion
      if (result?.success) {
        toast({
          title: "Success",
          description: "Item added to cart",
        });
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add item to cart",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    try {
      const result = (await buyNow(productId)) as ResultType; // Type assertion
      if (result?.success) {
        toast({
          title: "Success",
          description: "Purchase successful",
        });
      } else {
        throw new Error("Purchase failed");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Purchase failed",
        variant: "destructive",
      });
    } finally {
      setIsBuyingNow(false);
    }
  };

  return (
    <div className="flex flex-col space-y-4 mt-6">
      <Button 
        onClick={handleAddToCart} 
        disabled={isAddingToCart || isBuyingNow}
        size="lg"
      >
        {isAddingToCart ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <ShoppingBag className="mr-2 h-5 w-5" />
        )}
        {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
      </Button>
      <Button 
        onClick={handleBuyNow}
        disabled={isAddingToCart || isBuyingNow}
        size="lg"
        variant="secondary"
      >
        {isBuyingNow ? (
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
        ) : (
          <CreditCard className="mr-2 h-5 w-5" />
        )}
        {isBuyingNow ? "Processing..." : "Buy Now"}
      </Button>
    </div>
  );
}
