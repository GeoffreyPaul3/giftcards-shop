import Image from "next/image";
import Link from "next/link";
import all from "@/public/card11.png";
import fashion from "@/public/card12.png";
import retail from "@/public/card9.png";

export function CategoriesSelection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-extrabold tracking-tight">
          Shop by Category
        </h2>

        <Link
          className="text-sm font-semibold text-primary hover:text-primary/80"
          href="/products/all"
        >
          Browse all Products &rarr;
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8">
        {/* All Products */}
        <div className="group relative aspect-w-2 aspect-h-1 rounded-xl overflow-hidden sm:aspect-w-1 sm:row-span-2 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <Image
            src={all}
            alt="All Products Image"
            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 transition-opacity duration-300 group-hover:opacity-75" />
          <div className="p-6 absolute bottom-0 flex items-end">
            <Link href="/products/all">
              <h3 className="text-white font-semibold">All Products</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Fashion Category */}
        <div className="group relative aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <Image
            src={fashion}
            alt="Products for fashion Image"
            className="object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0 transition-opacity duration-300 group-hover:opacity-75" />
          <div className="p-6 absolute bottom-0 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/fashion">
              <h3 className="text-white font-semibold">Gift-Cards for Fashion</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>

        {/* Retail Category */}
        <div className="group relative aspect-w-2 aspect-h-1 rounded-lg overflow-hidden sm:relative sm:aspect-none sm:h-full shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <Image
            src={retail}
            alt="Retail product image"
            className="object-cover sm:absolute sm:inset-0 sm:w-full sm:h-full transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-55 sm:absolute sm:inset-0 transition-opacity duration-300 group-hover:opacity-75" />
          <div className="p-6 absolute bottom-0 flex items-end sm:absolute sm:inset-0">
            <Link href="/products/retail">
              <h3 className="text-white font-semibold">Gift-Cards for Retail</h3>
              <p className="mt-1 text-sm text-white">Shop Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
