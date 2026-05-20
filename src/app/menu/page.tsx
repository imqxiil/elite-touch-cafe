"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

import { useMenu, MenuItem } from "@/context/MenuContext";
import { useSiteConfig } from "@/context/SiteConfigContext";

const CATEGORIES = ["ALL", "HOT DRINKS", "COLD DRINKS"];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { addToCart } = useCart();
  const { menuItems } = useMenu();
  const { heroConfig } = useSiteConfig();

  const handleAddToCart = (item: MenuItem) => {
    addToCart({
      ...item,
      quantity: 1,
      price: parseFloat(item.price.toString())
    });
    setIsCartOpen(true);
  };

  const filteredItems = activeCategory === "ALL" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        {(heroConfig.menuTitle || heroConfig.menuDescription) && (
          <section className="py-20 px-4 text-center max-w-4xl mx-auto animate-fade-in">
            {heroConfig.menuTitle && <h1 className="text-display-lg text-[#000666] mb-6">{heroConfig.menuTitle}</h1>}
            {heroConfig.menuDescription && (
              <p className="text-body-lg text-gray-600 leading-relaxed px-4 md:px-20">
                {heroConfig.menuDescription}
              </p>
            )}
          </section>
        )}

        {/* Category Tabs */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="flex justify-center border-b border-gray-100">
            <div className="flex space-x-12">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`pb-4 text-xs font-bold tracking-widest transition-all relative ${
                    activeCategory === cat ? "text-[#000666]" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#000666] animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Menu Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {filteredItems.map((item) => (
              <div key={item.id} className="group flex flex-col h-full animate-fade-in">
                {/* Image Section */}
                <div className="aspect-[4/3] rounded-sm mb-6 overflow-hidden bg-gray-50 relative">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>

                {/* Content */}
                <div className="flex justify-between items-baseline mb-3">
                  <h3 className="text-headline-sm text-[#000666]">{item.name}</h3>
                  <span className="text-sm font-medium text-gray-900">${item.price}</span>
                </div>
                <p className="text-body-md text-gray-500 line-clamp-2 mb-6 flex-grow">
                  {item.description}
                </p>

                {/* Add to Cart Section */}
                <button
                  onClick={() => handleAddToCart(item)}
                  className="w-full py-4 border border-[#000666] text-[#000666] text-xs font-bold tracking-widest uppercase hover:bg-[#000666] hover:text-white transition-all duration-300"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
