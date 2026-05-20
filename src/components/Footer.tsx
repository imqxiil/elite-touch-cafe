"use client";

import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Footer() {
  const { infoConfig } = useSiteConfig();
  return (
    <footer className="bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center h-24 gap-4 py-8 md:py-0">
          {/* Logo */}
          <div className="font-display text-xl text-primary">
            Elite Touch Cafe
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link 
              href="/privacy" 
              className="text-xs text-gray-500 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              href="/terms" 
              className="text-xs text-gray-500 hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <span className="text-xs text-gray-500">
              Contact: {infoConfig.phone}
            </span>
          </div>

          {/* Copyright */}
          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} Elite Touch Cafe. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
