import type { Metadata } from "next";
import { EB_Garamond, DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Elite Touch Cafe | Premium Culinary Experience",
  description: "Experience the art of refinement at Elite Touch Cafe. A curated selection of the finest blends and culinary delights.",
};

import { CartProvider } from "@/context/CartContext";
import { MenuProvider } from "@/context/MenuContext";
import { GalleryProvider } from "@/context/GalleryContext";
import { SiteConfigProvider } from "@/context/SiteConfigContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={`${ebGaramond.variable} ${cormorantGaramond.variable} ${dmSans.variable} font-body min-h-full flex flex-col`}>
        <MenuProvider>
          <GalleryProvider>
            <SiteConfigProvider>
              <CartProvider>
                <div className="flex flex-col min-h-screen">
                  {children}
                </div>
              </CartProvider>
            </SiteConfigProvider>
          </GalleryProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
