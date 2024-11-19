import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon, Menu } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import Image from "next/image";
import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "@/components/ui/sheet";

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mb-2 flex items-center justify-between border-b">
      {/* Logo and Links */}
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-black font-bold text-xl lg:text-3xl">
            <Image src="/tlogo.png" alt="logo" width={120} height={120} />
          </h1>
        </Link>
        {/* Hidden on Mobile */}
        <div className="hidden md:block">
          <NavbarLinks />
        </div>
      </div>

      {/* Cart and User Auth */}
      <div className="flex items-center space-x-4">
        {/* Cart Link */}
        <Link href="/bag" className="group p-2 flex items-center">
          <ShoppingBagIcon className="h-6 w-6 text-gray-400 group-hover:text-gray-500" />
          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {total}
          </span>
        </Link>

        {/* User Dropdown or Sign In / Create Account */}
        {user ? (
          <UserDropdown
            email={user.email as string}
            name={user.given_name as string}
            userImage={
              user.picture ?? `https://avatar.vercel.sh/${user.given_name}`
            }
          />
        ) : (
          <div className="hidden md:flex space-x-2">
            <Button variant="ghost" asChild>
              <LoginLink>Sign in</LoginLink>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button variant="ghost" asChild>
              <RegisterLink>Create Account</RegisterLink>
            </Button>
          </div>
        )}

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost">
                <Menu className="h-8 w-8" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 bg-white overflow-y-auto">
              <SheetHeader>
                {/* Logo in Mobile Menu */}
                <Link href="/" className="flex items-center mb-6">
                  <Image src="/tlogo.png" alt="logo" width={120} height={120} />
                </Link>
              </SheetHeader>


              {/* Mobile Menu Links - only show if user is logged in */}
              {user && (
                <div className="space-y-4">
                  <NavbarLinks isMobile={true}/>
                </div>
              )}

              {/* Sign In / Create Account on Mobile */}
              {!user && (
                <div className="mt-6 space-y-2">
                  <Button variant="ghost" asChild className="w-full">
                    <LoginLink>Sign in</LoginLink>
                  </Button>
                  <Button variant="ghost" asChild className="w-full">
                    <RegisterLink>Create Account</RegisterLink>
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
