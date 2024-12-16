import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

async function getRelatedProducts(category: string, currentProductId: string) {
  const data = await prisma.product.findMany({
    where: {
      status: "published",
      category: category,
      id: { not: currentProductId },
    },
    select: {
      id: true,
      name: true,
      description: true,
      images: true,
      price: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return data;
}

export function RelatedProducts({ category, currentProductId }: { category: string, currentProductId: string }) {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Related Products</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadRelatedProducts category={category} currentProductId={currentProductId} />
      </Suspense>
    </>
  );
}

async function LoadRelatedProducts({ category, currentProductId }: { category: string, currentProductId: string }) {
  noStore();
  const data = await getRelatedProducts(category, currentProductId);

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}

