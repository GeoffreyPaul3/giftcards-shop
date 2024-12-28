"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navbarLinks = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Shop",
    href: "/shop",
  },
  {
    id: 3,
    name: "My Orders",
    href: "/my-orders",
  },
];

interface NavbarLinksProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

export function NavbarLinks({ isMobile = false, onLinkClick }: NavbarLinksProps) {
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
          onClick={onLinkClick}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
