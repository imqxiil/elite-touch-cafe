"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Locations() {
  const { infoConfig } = useSiteConfig();
  const locations = [
    {
      name: "Downtown Aspire",
      address: infoConfig.location,
      phone: infoConfig.phone,
      email: "hello@elitetouchcafe.com",
      hours: infoConfig.hours.map(h => ({
        days: h.day,
        time: h.isOpen ? `${h.open} - ${h.close}` : "Closed"
      })),
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6NjOlXiEzzrzXfxzMQ8bA0QfmLVPxXZ4ArjggbPdmmQev2WDXGncWtO153eufSPUYTvkngkTXEKCoAuJ2PvgyNJkE5WP2SRTcld-PP8b_mmfZBM-3mXqsHhPqlNM18Ysp_aCmBsX-W-EaoLsS0HthnaKAHRK1PjyED1XDcPFmVjMW4zZCzDRZ7M8r-XOjF6myso17JUixtKJSdBcBdLXpV_xEhnwkJqWUR5D6ozYSOkOtNPd7RMfSYtLJdqHcnd0yTiMCEfvuXVkZ"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-24 px-4 text-center max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-display-lg text-[#000666] mb-6">Our Locations</h1>
          <p className="text-body-lg text-gray-600 leading-relaxed px-4 md:px-20">
            Discover the art of refinement at our curated spaces. Each location is designed 
            to be a sanctuary of quiet luxury and intentional design.
          </p>
        </section>

        {/* Locations List */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          {locations.map((loc, index) => (
            <div key={index} className="bg-[#fbf8ff] rounded-sm border border-gray-100 p-8 md:p-16 animate-fade-in shadow-sm">
              <h2 className="text-headline-lg text-[#000666] mb-12 text-center border-b border-[#000666]/10 pb-8">{loc.name}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                {/* Left Column: Address & Contact */}
                <div className="space-y-12">
                  {/* Address */}
                  <div>
                    <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4">Address</p>
                    <p className="text-body-lg text-[#000666] leading-relaxed whitespace-pre-wrap">{loc.address}</p>
                  </div>
                  
                  {/* Contact */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Phone</p>
                      <a href={`tel:${loc.phone}`} className="text-body-lg text-[#000666] hover:opacity-70 transition-opacity">{loc.phone}</a>
                    </div>
                    <div>
                      <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">Email</p>
                      <a href={`mailto:${loc.email}`} className="text-body-lg text-[#000666] hover:opacity-70 transition-opacity">{loc.email}</a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hours */}
                <div>
                  <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Opening Hours</p>
                  <div className="space-y-4">
                    {loc.hours.map((h, i) => (
                      <div key={i} className="flex justify-between items-baseline border-b border-[#000666]/10 border-dotted pb-3">
                        <span className="text-body-md text-gray-500">{h.days}</span>
                        <span className="text-body-md font-medium text-[#000666]">{h.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
