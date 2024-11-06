export const dynamic = 'force-dynamic';


import { ProductCard } from "@/app/components/storefront/ProductCard";
import prisma from "@/app/lib/db";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

type Product = {
  id: string;
  name: string;
  images: string[];
  price: number;
  description: string;
};

async function getData(productCategory: string) {
  switch (productCategory) {
    case "all": {
      const data = await prisma.product.findMany({
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
        where: {
          status: "published",
        },
      });

      return {
        title: "All Products",
        data: data as Product[],
      };
    }
    case "fashion": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "fashion",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Fashion",
        data: data,
      };
    }
    case "retail": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "retail",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products For Retail",
        data: data,
      };
    }
    case "entertainment": {
      const data = await prisma.product.findMany({
        where: {
          status: "published",
          category: "entertainment",
        },
        select: {
          name: true,
          images: true,
          price: true,
          id: true,
          description: true,
        },
      });

      return {
        title: "Products for Entertainment",
        data: data,
      };
    }
    default: {
      return notFound();
    }
  }
}

export default async function CategoriesPage(
  props: {
    params: Promise<{ name: string }>;
  }
) {
  const params = await props.params;
  noStore();
  const { data, title } = await getData(params.name);
  return (
    <section>
      <h1 className="font-semibold text-3xl my-5">{title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {data.map((item) => (
          <ProductCard item={item} key={item.id} />
        ))}
      </div>
    </section>
  );
}
