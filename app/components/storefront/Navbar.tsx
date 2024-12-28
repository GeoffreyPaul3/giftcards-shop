
import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBagIcon } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";
import Image from "next/image";
import { MobileNav } from "./MobileNav"; 


export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const cart: Cart | null = await redis.get(`cart-${user?.id}`);
  const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // Function to close the sheet when a link is clicked
  const handleLinkClick = () => {
    // Custom logic when a link is clicked
  };

  return (
    <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 mb-2 flex items-center justify-between border-b">
      {/* Logo and Links */}
      <div className="flex items-center">
        <Link href="/" onClick={handleLinkClick}>
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
            userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
          />
        ) : (
          <div className="hidden md:flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/sign-in">Sign in</Link>
            </Button>
            <span className="h-6 w-px bg-gray-200"></span>
            <Button asChild>
              <Link href="/auth/sign-up">Create Account</Link>
            </Button>
          </div>
        )}

        {/* Mobile Menu Trigger */}
        <div className="md:hidden">
          <MobileNav user={user ? { id: user.id, name: user.given_name as string } : null} handleLinkClick={handleLinkClick} />
        </div>
      </div>
    </nav>
  );
}
