"use client";

import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

import { useCart } from "@/context/CartContext";

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-[20px] z-40 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <aside 
        aria-label="Cart Drawer" 
        className="bg-surface fixed top-0 right-0 h-full w-full md:w-[360px] z-[100] border-l border-outline-variant flex flex-col p-lg gap-md shadow-2xl transition-transform duration-500 ease-in-out"
      >
        {/* Header */}
        <header className="flex justify-between items-center pb-md border-b border-outline-variant">
          <div className="flex flex-col gap-xs">
            <h2 className="text-headline-sm text-primary">Your Order</h2>
            <p className="text-label-sm text-on-surface-variant">Elite curation for the discerning palate.</p>
          </div>
          <button 
            aria-label="Close cart" 
            className="text-on-surface-variant hover:text-primary transition-colors p-2"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-lg py-md">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center px-6">
              <span className="material-symbols-outlined text-4xl text-outline mb-4">shopping_bag</span>
              <p className="text-label-sm text-on-surface-variant">Your selection is currently empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-start gap-md pb-md border-b border-surface-variant group">
                <div className="w-16 h-16 rounded overflow-hidden shrink-0 border border-outline-variant/30">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col gap-xs">
                  <div className="flex justify-between items-start">
                    <h3 className="text-label-sm text-on-surface">{item.name}</h3>
                    <span className="text-label-sm text-primary font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center mt-sm">
                    <div className="flex items-center gap-md border border-outline-variant/50 rounded-full px-4 py-1">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">remove</span>
                      </button>
                      <span className="text-label-sm text-on-surface w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-on-surface-variant hover:text-primary transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">add</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-on-surface-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-xl">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        <div className="flex flex-col gap-md pt-md border-t border-outline-variant mt-auto bg-surface">
          <div className="flex justify-between items-center mb-sm">
            <span className="text-body-md text-on-surface-variant">Subtotal</span>
            <span className="text-headline-sm text-primary tracking-tight font-bold">${subtotal.toFixed(2)}</span>
          </div>
          <Link 
            href="/checkout"
            onClick={onClose}
            className={`w-full text-label-sm py-4 transition-all flex items-center justify-center gap-sm rounded ${
              cart.length === 0 
                ? "bg-outline text-surface cursor-not-allowed opacity-50 pointer-events-none" 
                : "bg-primary text-on-primary hover:opacity-90"
            }`}
          >
            Checkout Now
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
          <button 
            className="w-full bg-transparent text-primary text-label-sm py-4 border border-primary/20 hover:bg-surface-container-low transition-colors rounded"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
}
