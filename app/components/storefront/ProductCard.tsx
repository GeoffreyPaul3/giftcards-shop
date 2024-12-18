"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { addItem } from "@/app/actions"; 
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface iAppProps {
  item: {
    id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  };
}

export function ProductCard({ item }: iAppProps) {
  const { toast } = useToast(); // Initialize toast
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddProductToShoppingCart = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh on form submission
    setIsAddingToCart(true);
    try {
      await addItem(item.id); // Call server action to add item to cart
      toast({
        title: "Success",
        description: `${item.name} Item has been added to cart!`,
        variant: "default", // You can customize the variant here
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className="rounded-lg shadow-lg hover:shadow-xl bg-white dark:bg-gray-800 overflow-hidden border border-gray-300 dark:border-gray-700">
      {/* Carousel */}
      <div className="relative w-full">
        <Carousel className="w-full">
          <CarouselContent>
            {item.images.map((image, index) => (
              <CarouselItem key={index} className="w-full flex-shrink-0">
                <div className="relative h-[330px]">
                  <Image
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    fill
                    className="object-cover object-center w-full h-full rounded-lg"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Default carousel controls */}
          <CarouselPrevious className="ml-16" />
          <CarouselNext className="mr-16" />
        </Carousel>
      </div>

      {/* Product Information */}
      <div className="p-4">
        {/* Product Name & Price */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
            {item.name}
          </h1>
          <h3>
            <Badge className="bg-primary/100 text-white px-3 py-1 rounded-md text-xs font-medium">
              ${item.price.toFixed(2)}
            </Badge>
          </h3>
        </div>
        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {item.description}
        </p>
        {/* CTA Button */}
        <div className="flex items-center justify-between">
          <Button className="flex-1 mr-2">
            <Link href={`/product/${item.id}`}>Learn More</Link>
          </Button>

          {/* Add to Cart Button */}
          <Button 
            className="aspect-square" 
            size="icon" 
            variant="secondary" 
            onClick={handleAddProductToShoppingCart} 
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <span className="h-4 w-4 animate-spin">⏳</span> // Loading indicator
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
            <span className="sr-only">Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function LoadingProductCard() {
  return (
    <div className="rounded-lg shadow-lg bg-white dark:bg-gray-800 p-4 animate-pulse border border-gray-300 dark:border-gray-700">
      <Skeleton className="w-full h-[330px] rounded-lg" />
      <div className="flex flex-col mt-4 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <Skeleton className="w-full h-10 mt-5 rounded-lg" />
    </div>
  );
}
