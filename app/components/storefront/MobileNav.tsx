"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import Image from "next/image";
import { NavbarLinks } from "./NavbarLinks";


interface MobileNavProps {
  user: { id: string; name: string } | null;
  handleLinkClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ user, handleLinkClick }) => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu className="h-8 w-8" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 bg-white overflow-y-auto">
        <SheetHeader>
          {/* Logo in Mobile Menu */}
          <Link href="/" className="flex items-center mb-6" onClick={handleLinkClick}>
            <Image src="/tlogo.png" alt="logo" width={120} height={120} />
          </Link>
        </SheetHeader>
        <Separator className="border border-gray-50" />

        {/* Mobile Menu Links */}
        {user && (
          <div className="space-y-4">
            <NavbarLinks isMobile={true} onLinkClick={handleLinkClick} />
          </div>
        )}

        {/* Sign In / Create Account on Mobile */}
        {!user && (
          <div className="mt-6 space-y-2">
            <Button variant="ghost" asChild className="w-full">
              <Link href="/auth/sign-in" onClick={handleLinkClick}>
                Sign in
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full">
              <Link href="/auth/sign-up" onClick={handleLinkClick}>
                Create Account
              </Link>
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
