"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { useMenu } from "@/context/MenuContext";

export default function Home() {
  const { heroConfig, infoConfig } = useSiteConfig();
  const { menuItems } = useMenu();
  const featuredItems = menuItems.slice(0, 3);
  
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todaysHours = infoConfig.hours.find(h => h.day === today) || infoConfig.hours[0];

  return (
    <>
      <Navbar />
      
      <main className="flex-grow">
        {/* Full-width Hero */}
        <header 
          className="relative w-full min-h-[80vh] flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop py-xxl text-center animate-fade-in"
          style={{ 
            backgroundImage: `linear-gradient(rgba(245, 245, 247, 0.85), rgba(245, 245, 247, 0.85)), url("${heroConfig.heroImageUrl}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-md">
            <h1 className="text-display-lg md:text-[64px] text-primary mb-2">
              {heroConfig.mainTitle}
            </h1>
            <p className="text-display-lg-mobile md:text-[28px] text-primary/60 tracking-[0.2em]" dir="rtl">
              {heroConfig.arabicSubtitle}
            </p>
            <div className="flex items-center w-full max-w-[320px] gap-4 my-8">
              <div className="h-[1px] flex-grow bg-primary/30"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-primary/50"></div>
              <div className="h-[1px] flex-grow bg-primary/30"></div>
            </div>
            <div className="text-label-sm text-on-surface-variant tracking-[0.2em] uppercase font-medium">
              {heroConfig.status === "open" ? "NOW OPEN" : "OPENING SOON"} · {infoConfig.location.toUpperCase()}
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="w-full flex justify-center py-xl bg-surface">
          <div className="w-2/3 max-w-3xl flex items-center space-x-4">
            <div className="h-[1px] flex-grow bg-primary opacity-30 border-dashed border-t"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-50"></div>
            <div className="h-[1px] flex-grow bg-primary opacity-30 border-dashed border-t"></div>
          </div>
        </div>

        {/* Featured Drinks Section */}
        <section className="py-xxl px-margin-mobile md:px-margin-desktop bg-surface max-w-7xl mx-auto">
          {(heroConfig.signatureTitle || heroConfig.signatureDescription) && (
            <div className="text-center mb-xl">
              {heroConfig.signatureTitle && <h2 className="text-headline-md text-primary mb-sm">{heroConfig.signatureTitle}</h2>}
              {heroConfig.signatureDescription && (
                <p className="text-body-md text-on-surface-variant max-w-2xl mx-auto">
                  {heroConfig.signatureDescription}
                </p>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {featuredItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`bg-surface-container-lowest border border-outline-variant rounded-lg p-lg hover:shadow-[0_20px_40px_-15px_rgba(0,6,102,0.15)] transition-all duration-300 flex flex-col group ${index === 1 ? 'md:-translate-y-8' : ''}`}
              >
                <div className="w-full aspect-[4/5] bg-surface-container mb-md rounded overflow-hidden relative">
                  <img 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    src={item.image}
                  />
                </div>
                <div className="flex justify-between items-end mt-auto pt-sm border-t border-outline-variant/30 border-dotted">
                  <div>
                    <h3 className="text-headline-sm text-primary">{item.name}</h3>
                    <p className="text-label-sm text-on-surface-variant mt-xs uppercase">{item.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-xl">
            <Link 
              href="/menu"
              className="border border-primary text-primary bg-transparent text-label-sm px-8 py-4 rounded hover:bg-surface-container-low transition-colors uppercase tracking-[0.2em]"
            >
              View Full Menu
            </Link>
          </div>
        </section>

        {/* Visit Us Strip */}
        <section className="bg-primary text-on-primary py-xxl px-margin-mobile md:px-margin-desktop w-full relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {/* Pattern background could go here */}
          </div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center relative z-10 gap-lg">
            <div className="text-center md:text-left">
              <h2 className="text-headline-md mb-xs">Visit Us</h2>
              <p className="text-body-md opacity-80">Experience the art of refinement.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-lg items-center md:items-start text-center md:text-left">
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined opacity-70 text-3xl">location_on</span>
                <div>
                  <p className="text-label-sm uppercase tracking-widest opacity-70 mb-1">Location</p>
                  <p className="text-body-md">{infoConfig.location}</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white opacity-20 mx-4"></div>
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined opacity-70 text-3xl">call</span>
                <div>
                  <p className="text-label-sm uppercase tracking-widest opacity-70 mb-1">Contact</p>
                  <p className="text-body-md">{infoConfig.phone}</p>
                </div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white opacity-20 mx-4"></div>
              <div className="flex items-center gap-md">
                <span className="material-symbols-outlined opacity-70 text-3xl">schedule</span>
                <div>
                  <p className="text-label-sm uppercase tracking-widest opacity-70 mb-1">{"Today's Hours"}</p>
                  <p className="text-body-md">
                    {todaysHours.isOpen ? `${todaysHours.open} - ${todaysHours.close}` : 'Closed Today'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
