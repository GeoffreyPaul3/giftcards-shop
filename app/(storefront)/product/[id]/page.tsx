
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import { RelatedProducts } from "@/app/components/storefront/RelatedProducts";
import prisma from "@/app/lib/db";

import { StarIcon } from 'lucide-react';
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { ProductActions } from "./product-actions";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
      category: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function ProductIdRoute({
  params: paramsPromise,
}: {
  params: Promise<{ id: string }>;
}) {
  noStore();

  const { id } = await paramsPromise;
  const data = await getData(id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />

        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900 dark:text-gray-100">${data.price.toFixed(2)}</p>

          <div className="mt-3 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(5.0)</span>
          </div>

          <p className="text-base text-gray-700 dark:text-gray-300 mt-6">{data.description}</p>

          <ProductActions productId={data.id} />
        </div>
      </div>

      <div className="mt-16">
        <RelatedProducts category={data.category} currentProductId={data.id} />
      </div>
    </>
  );
}

