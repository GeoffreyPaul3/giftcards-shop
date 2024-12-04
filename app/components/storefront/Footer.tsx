import { SiFacebook, SiInstagram, SiX } from 'react-icons/si';
import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Footer Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-gray-900/10 pt-8">

        {/* Customer Service Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/contact" className="hover:text-primary transition duration-300">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-primary transition duration-300">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Information Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Company</h3>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li>
              <Link href="/about" className="hover:text-primary transition duration-300">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition duration-300">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Follow Us Section */}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Follow Us</h3>
          <div className="mt-4 flex space-x-6 text-gray-600">
            <Link href="https://www.facebook.com/profile.php?id=61568004368033" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition duration-300" aria-label="Facebook">
              <SiFacebook size={20} />
            </Link>
            <Link href="https://www.instagram.com/tconnect.mw/profilecard/?igsh=am80OWR6OWZ0MGlp" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition duration-300" aria-label="Instagram">
              <SiInstagram size={20} />
            </Link>
            <Link href="https://x.com/tconnect01?t=cDVL2qQ0ctusyeB7O6onpw&s=09" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition duration-300" aria-label="Twitter">
              <SiX size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t border-gray-900/10 pt-8 mt-8 text-center">
        <p className="text-xs text-gray-700 leading-5">
          © {new Date().getFullYear()} Tconnect powered by Trickal Holdings. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
