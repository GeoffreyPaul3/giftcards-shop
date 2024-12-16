import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

// Import your category images here
import allImage from "@/public/card11.png";
import fashionImage from "@/public/card12.png";
import retailImage from "@/public/card9.png";
import techImage from "@/public/card11.png";

const categories = [
  { name: "All Products", image: allImage, href: "/products/all" },
  { name: "Fashion", image: fashionImage, href: "/products/fashion" },
  { name: "Retail", image: retailImage, href: "/products/retail" },
  { name: "Entertainment", image: techImage, href: "/products/entertainment" },
];

export function CategoriesSelection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Shop by Category
          </h2>
          <Link
            className="text-sm font-semibold text-primary hover:text-primary/80 flex items-center transition-colors duration-200"
            href="/products/all"
          >
            Browse all Products
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="aspect-w-3 aspect-h-4">
                <Image
                  src={category.image}
                  alt={`${category.name} category`}
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  layout="fill"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              </div>
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-white mb-2 transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                  {category.name}
                </h3>
                <Button
                  variant="outline"
                  className="w-full bg-white/10 text-white border-white/20 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100"
                >
                  Shop Now
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
