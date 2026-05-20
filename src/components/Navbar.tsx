"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();
  const { cart } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: "Menu", href: "/menu" },
    { name: "Locations", href: "/locations" },
  ];

  return (
    <>
      <nav className="bg-white border-b border-gray-100 z-50 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="font-display text-2xl text-primary">
                Elite Touch Cafe
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === link.href ? "text-primary border-b-2 border-primary pb-1" : "text-gray-600"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Cart Button */}
              <button
                id="navbar-cart-button"
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#000666] text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-opacity-90 transition-all flex items-center gap-2"
                aria-label={`Open cart, ${itemCount} items`}
              >
                <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#000666] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#000666] leading-none">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Order Now */}
              <Link
                href="/menu"
                className="bg-[#000666] text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-opacity-90 transition-all"
              >
                Order Now
              </Link>
            </div>

            {/* Mobile: cart + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative bg-[#000666] text-white p-2 rounded-sm"
                aria-label={`Open cart, ${itemCount} items`}
              >
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                {itemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-white text-[#000666] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border border-[#000666] leading-none">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 p-2"
              >
                <span className="material-symbols-outlined">
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 animate-fade-in">
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-base font-medium text-gray-600 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/menu"
                className="block w-full bg-[#000666] text-white px-6 py-3 rounded-sm text-center font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Order Now
              </Link>
            </div>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
