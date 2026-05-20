"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { infoConfig } = useSiteConfig();
  const [orderType, setOrderType] = useState<"DINE IN" | "TAKEAWAY">("DINE IN");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    notes: ""
  });
  const [isOrdered, setIsOrdered] = useState(false);

  const total = subtotal;

  const handleWhatsAppOrder = () => {
    if (!formData.name || !formData.phone) {
      alert("Please fill in your name and phone number.");
      return;
    }

    // Prepare WhatsApp message
    const itemsList = cart.map(item => `- ${item.name} x${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`).join("\n");
    const message = `*New Order - Elite Touch Cafe*\n\n` +
      `*Order Type:* ${orderType}\n` +
      `*Name:* ${formData.name}\n` +
      `*Phone:* ${formData.phone}\n` +
      `*Notes:* ${formData.notes || "None"}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total: $${total.toFixed(2)}*\n\n` +
      `Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    // Clean phone number for WhatsApp (remove spaces, pluses, dashes)
    let cleanPhone = infoConfig.phone.replace(/\D/g, '');
    
    // If it's a local Qatar number (8 digits), prepend the country code
    if (cleanPhone.length === 8) {
      cleanPhone = `974${cleanPhone}`;
    }
    
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    setIsOrdered(true);
    clearCart(); // Clear the cart after sending the order
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-20 px-4">
          <section className="w-full max-w-[600px] mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 bg-[#000666]/5 rounded-full flex items-center justify-center mx-auto mb-10">
              <span className="material-symbols-outlined text-[#000666] text-4xl">check_circle</span>
            </div>
            
            <h1 className="text-[32px] text-[#000666] mb-6 tracking-tight font-medium leading-tight" style={{ fontFamily: "var(--font-heading), serif" }}>
              Order Sent!
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 mb-12 leading-relaxed max-w-[480px] mx-auto font-sans">
              Thank you, <span className="text-[#000666] font-medium">{formData.name}</span>. We&apos;ll confirm your order on WhatsApp shortly.
            </p>
            
            <Link 
              href="/menu"
              onClick={() => clearCart()}
              className="inline-block px-12 py-4 border border-[#000666] text-[#000666] text-xs font-bold tracking-widest uppercase hover:bg-[#000666] hover:text-white transition-all duration-300 rounded-sm"
            >
              Back to Menu
            </Link>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <header className="mb-16">
          <h1 className="text-display-sm text-[#000666] mb-2">Checkout</h1>
          <p className="text-body-md text-gray-500">Complete your order details below.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-headline-sm text-[#000666] mb-8">Your Details</h2>
              
              <div className="space-y-10">
                {/* Order Type */}
                <div className="space-y-4">
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Order Type</label>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setOrderType("DINE IN")}
                      className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all ${
                        orderType === "DINE IN" 
                          ? "bg-[#000666] text-white" 
                          : "border border-[#000666]/20 text-[#000666] hover:border-[#000666]"
                      }`}
                    >
                      DINE IN
                    </button>
                    <button 
                      onClick={() => setOrderType("TAKEAWAY")}
                      className={`px-8 py-3 rounded-full text-xs font-bold tracking-widest transition-all ${
                        orderType === "TAKEAWAY" 
                          ? "bg-[#000666] text-white" 
                          : "border border-[#000666]/20 text-[#000666] hover:border-[#000666]"
                      }`}
                    >
                      TAKEAWAY
                    </button>
                  </div>
                </div>

                {/* Inputs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full py-3 border-b border-gray-200 focus:border-[#000666] outline-none transition-colors text-body-md"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Phone Number</label>
                    <input 
                      type="tel" 
                      placeholder="+1 (555) 000-0000"
                      className="w-full py-3 border-b border-gray-200 focus:border-[#000666] outline-none transition-colors text-body-md"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-gray-400 uppercase">Special Notes</label>
                  <textarea 
                    placeholder="Any dietary requirements or special requests..."
                    className="w-full h-32 p-4 border border-gray-100 bg-gray-50/50 focus:border-[#000666] focus:bg-white outline-none transition-all text-body-md resize-none"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Summary Section */}
          <div className="lg:col-span-1">
            <div className="border border-gray-100 p-8 rounded-sm sticky top-24">
              <h2 className="text-headline-sm text-[#000666] mb-8">Order Summary</h2>
              
              <div className="space-y-6 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start">
                    <div>
                      <h3 className="text-label-md text-gray-900 font-medium">{item.name}</h3>
                      <p className="text-xs text-gray-500 mt-1">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                {cart.length === 0 && (
                  <p className="text-sm text-gray-400 italic">No items selected.</p>
                )}
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-body-md text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-headline-sm text-[#000666] pt-4 font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppOrder}
                className="w-full mt-10 bg-[#25D366] text-white py-4 font-bold text-xs tracking-widest uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-3 rounded-sm"
              >
                <span className="material-symbols-outlined text-lg">send</span>
                Send your order via WhatsApp
              </button>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
