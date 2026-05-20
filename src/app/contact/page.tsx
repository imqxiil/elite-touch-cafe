"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Contact() {
  const { infoConfig } = useSiteConfig();
  return (
    <>
      <Navbar />
      
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-xxl flex flex-col md:flex-row gap-xl md:gap-[120px] animate-fade-in">
        {/* Left Column: Contact Details */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="mb-xxl">
            <h1 className="text-display-lg-mobile md:text-display-lg text-primary mb-md">Get in Touch</h1>
            <p className="text-body-lg text-on-surface-variant max-w-[448px]">
              We look forward to welcoming you. Reach out to us for private events or general inquiries.
            </p>
          </div>

          {/* Phone */}
          <div className="mb-xl">
            <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] mb-xs">Phone</p>
            <a 
              className="text-display-lg-mobile md:text-display-lg text-primary hover:opacity-80 transition-opacity block -ml-1" 
              href={`tel:${infoConfig.phone}`}
            >
              {infoConfig.phone}
            </a>
          </div>

          {/* Social */}
          <div className="mb-xl">
            <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] mb-md">Social</p>
            <a 
              className="inline-flex items-center gap-md text-body-lg text-primary hover:text-secondary transition-colors group" 
              href="#"
            >
              <span className="w-12 h-12 border border-outline-variant rounded-full flex items-center justify-center group-hover:border-primary transition-all duration-300">
                <span className="material-symbols-outlined">music_note</span>
              </span>
              <span className="font-medium">{infoConfig.tiktok}</span>
            </a>
          </div>

          {/* Hours */}
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-[0.2em] mb-md">Opening Hours</p>
            <div className="border-t border-outline-variant max-w-[384px]">
              {infoConfig.hours.map((hour) => (
                <div key={hour.day} className={`flex justify-between py-md border-b border-outline-variant border-dotted ${!hour.isOpen ? 'opacity-50' : ''}`}>
                  <span className="text-body-md text-on-surface-variant">{hour.day}</span>
                  <span className="text-body-md text-primary font-medium">
                    {hour.isOpen ? `${hour.open} - ${hour.close}` : 'Closed'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="flex-1 min-h-[400px] md:min-h-[600px] flex items-center">
          <div className="w-full h-full bg-surface-container rounded-lg border border-outline-variant overflow-hidden relative group">
            <img 
              alt="Map of Aspire Zone" 
              className="w-full h-full object-cover absolute inset-0 opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6NjOlXiEzzrzXfxzMQ8bA0QfmLVPxXZ4ArjggbPdmmQev2WDXGncWtO153eufSPUYTvkngkTXEKCoAuJ2PvgyNJkE5WP2SRTcld-PP8b_mmfZBM-3mXqsHhPqlNM18Ysp_aCmBsX-W-EaoLsS0HthnaKAHRK1PjyED1XDcPFmVjMW4zZCzDRZ7M8r-XOjF6myso17JUixtKJSdBcBdLXpV_xEhnwkJqWUR5D6ozYSOkOtNPd7RMfSYtLJdqHcnd0yTiMCEfvuXVkZ"
            />
            {/* Map Overlay Badge */}
            <div className="absolute bottom-lg left-lg bg-surface/90 backdrop-blur-md p-lg rounded border border-outline-variant shadow-[0_10px_20px_rgba(0,6,102,0.1)]">
              <p className="text-label-sm text-primary uppercase tracking-widest mb-xs">Location</p>
              <p className="text-body-md text-on-surface font-medium">Aspire Zone, Doha<br/>Qatar</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
