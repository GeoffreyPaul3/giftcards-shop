"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const navbarLinks = [
  {
    id: 0,
    name: "Home",
    href: "/",
  },
  {
    id: 1,
    name: "All Products",
    href: "/products/all",
  },
  {
    id: 2,
    name: "Fashion",
    href: "/products/fashion",
  },
  {
    id: 3,
    name: "Retail",
    href: "/products/retail",
  },
  {
    id: 4,
    name: "Entertainment",
    href: "/products/entertainment",
  },
  {
    id: 5,
    name: "My Orders",
    href: "/my-orders",
  },
];

export function NavbarLinks({ isMobile = false }: { isMobile?: boolean }) {
  const location = usePathname();
  
  return (
    <div className={cn(isMobile ? "flex flex-col space-y-4" : "hidden md:flex justify-center items-center gap-x-2 ml-8")}>
      {navbarLinks.map((item) => (
        <Link
          href={item.href}
          key={item.id}
          className={cn(
            location === item.href
              ? "bg-muted"
              : "hover:bg-muted hover:bg-opacity-75",
            "group p-2 font-medium rounded-md"
          )}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
