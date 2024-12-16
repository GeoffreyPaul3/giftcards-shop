import prisma from "@/app/lib/db";
import { LoadingProductCard, ProductCard } from "./ProductCard";
import { Suspense } from "react";
import { unstable_noStore as noStore } from "next/cache";

// Define a union type for valid categories based on your Prisma enum
type CategoryEnum = "fashion" | "retail" | "entertainment";

// Fetch related products based on category and current product ID
async function getRelatedProducts(category: CategoryEnum, currentProductId: string) {
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

// Main component to render related products
export function RelatedProducts({ category, currentProductId }: { category: CategoryEnum, currentProductId: string }) {
  return (
    <>
      <h2 className="text-2xl font-extrabold tracking-tight">Related Products</h2>
      <Suspense fallback={<LoadingRows />}>
        <LoadRelatedProducts category={category} currentProductId={currentProductId} />
      </Suspense>
    </>
  );
}

// Helper function to load related products
async function LoadRelatedProducts({ category, currentProductId }: { category: CategoryEnum, currentProductId: string }) {
  noStore(); // Disable caching for this component
  const data = await getRelatedProducts(category, currentProductId);

  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {data.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </div>
  );
}

// Loading state for the related products section
function LoadingRows() {
  return (
    <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <LoadingProductCard />
      <LoadingProductCard />
      <LoadingProductCard />
    </div>
  );
}
