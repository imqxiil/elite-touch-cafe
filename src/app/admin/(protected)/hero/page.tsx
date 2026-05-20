"use client";

import { useState, useEffect } from "react";
import { useSiteConfig } from "@/context/SiteConfigContext";
import { addAdminNotification } from "@/utils/notifications";

export default function HeroEditor() {
  const { heroConfig, updateHeroConfig } = useSiteConfig();
  
  const [mainTitle, setMainTitle] = useState(heroConfig.mainTitle);
  const [arabicSubtitle, setArabicSubtitle] = useState(heroConfig.arabicSubtitle);
  const [tagline, setTagline] = useState(heroConfig.tagline);
  const [status, setStatus] = useState<"open" | "soon">(heroConfig.status);
  const [signatureTitle, setSignatureTitle] = useState(heroConfig.signatureTitle);
  const [signatureDescription, setSignatureDescription] = useState(heroConfig.signatureDescription);
  const [menuTitle, setMenuTitle] = useState(heroConfig.menuTitle);
  const [menuDescription, setMenuDescription] = useState(heroConfig.menuDescription);
  const [heroImageUrl, setHeroImageUrl] = useState(heroConfig.heroImageUrl);
  const [imageError, setImageError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMainTitle(heroConfig.mainTitle);
      setArabicSubtitle(heroConfig.arabicSubtitle);
      setTagline(heroConfig.tagline);
      setStatus(heroConfig.status);
      setSignatureTitle(heroConfig.signatureTitle);
      setSignatureDescription(heroConfig.signatureDescription);
      setMenuTitle(heroConfig.menuTitle);
      setMenuDescription(heroConfig.menuDescription);
      setHeroImageUrl(heroConfig.heroImageUrl);
      setImageError(false);
    }, 0);
  }, [heroConfig]);

  const handleSave = () => {
    updateHeroConfig({
      mainTitle,
      arabicSubtitle,
      tagline,
      status,
      heroImageUrl,
      signatureTitle,
      signatureDescription,
      menuTitle,
      menuDescription
    });
    addAdminNotification("Hero Updated", `Main Title changed to "${mainTitle}"`);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="animate-fade-in flex flex-col gap-xl">
      <header className="mb-xl border-b border-outline-variant pb-sm">
        <h2 className="text-display-lg text-primary font-medium">Hero Banner Editor</h2>
        <p className="text-body-md text-on-surface-variant mt-sm">Curate the first impression of the digital menu. Changes are reflected instantly in the preview.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Editor Form (Left Column) */}
        <div className="lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm relative z-10">
          <form className="flex flex-col gap-xl">
            {/* Hero Image URL */}
            <div className="flex flex-col gap-sm">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="hero_image_url">Hero Background Image URL</label>
              <input 
                className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-body-md text-on-surface focus:border-primary outline-none transition-colors" 
                id="hero_image_url" 
                type="url" 
                value={heroImageUrl}
                onChange={(e) => { setHeroImageUrl(e.target.value); setImageError(false); }}
                placeholder="https://example.com/image.jpg"
              />
              {heroImageUrl && (
                <div className="relative w-full aspect-[16/5] rounded overflow-hidden bg-surface-container mt-xs">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={heroImageUrl}
                    alt="Hero preview"
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                    onLoad={() => setImageError(false)}
                  />
                  {imageError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container text-on-surface-variant gap-xs">
                      <span className="material-symbols-outlined text-[32px]">broken_image</span>
                      <p className="text-label-sm">Could not load image — check the URL</p>
                    </div>
                  )}
                </div>
              )}
              <p className="text-label-sm text-on-surface-variant">Paste any public image URL. The image will be overlaid with a soft tint on the homepage.</p>
            </div>
            {/* Main Title */}
            <div className="flex flex-col gap-sm">
              <label className="text-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="main_title">Main Title</label>
              <input 
                className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-headline-sm text-on-surface focus:border-primary outline-none transition-colors" 
                id="main_title" 
                type="text" 
                value={mainTitle}
                onChange={(e) => setMainTitle(e.target.value)}
              />
            </div>

            {/* Arabic Subtitle */}
            <div className="flex flex-col gap-sm">
              <label className="text-label-sm text-on-surface-variant flex justify-between uppercase tracking-widest" htmlFor="arabic_subtitle">
                <span>Arabic Subtitle (RTL)</span>
                <span className="material-symbols-outlined text-[16px]">language</span>
              </label>
              <input 
                className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-headline-sm text-on-surface focus:border-primary outline-none transition-colors text-right" 
                dir="rtl" 
                id="arabic_subtitle" 
                type="text" 
                value={arabicSubtitle}
                onChange={(e) => setArabicSubtitle(e.target.value)}
              />
            </div>


            {/* Content Sections Editor */}
            <div className="pt-xl border-t border-outline-variant flex flex-col gap-xl">
              <h3 className="text-title-lg text-primary font-medium">Page Sections</h3>
              <p className="text-body-sm text-on-surface-variant -mt-md">Leave blank to hide these sections from the website.</p>

              {/* Signature Pour Section */}
              <div className="flex flex-col gap-sm">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="signature_title">Homepage: Signature Pour Title</label>
                <input 
                  className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-headline-sm text-on-surface focus:border-primary outline-none transition-colors" 
                  id="signature_title" 
                  type="text" 
                  value={signatureTitle}
                  onChange={(e) => setSignatureTitle(e.target.value)}
                  placeholder="e.g. Signature Pour"
                />
              </div>
              <div className="flex flex-col gap-sm">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="signature_description">Homepage: Signature Pour Description</label>
                <textarea 
                  className="w-full bg-surface border border-outline-variant rounded p-md text-body-md text-on-surface focus:border-primary outline-none transition-colors resize-none" 
                  id="signature_description" 
                  rows={3}
                  value={signatureDescription}
                  onChange={(e) => setSignatureDescription(e.target.value)}
                  placeholder="Leave empty to hide this section"
                />
              </div>

              {/* Curated Selections Section */}
              <div className="flex flex-col gap-sm">
                <label className="text-label-sm text-on-surface-variant uppercase tracking-widest" htmlFor="menu_title">Menu Page: Title</label>
                <input 
                  className="w-full bg-transparent border-b border-outline-variant px-0 py-2 text-headline-sm text-on-surface focus:border-primary outline-none transition-colors" 
                  id="menu_title" 
                  type="text" 
                  value={menuTitle}
                  onChange={(e) => setMenuTitle(e.target.value)}
                  placeholder="e.g. Curated Selections"
                />
              </div>
            </div>

            {/* Status Toggle */}
            <div className="flex flex-col gap-sm">
              <span className="text-label-sm text-on-surface-variant uppercase tracking-widest">Operational Status</span>
              <div className="flex p-1 bg-surface-container-low rounded border border-outline-variant">
                <button 
                  type="button"
                  onClick={() => setStatus("soon")}
                  className={`flex-1 py-3 px-4 rounded text-label-sm uppercase tracking-widest transition-all ${
                    status === "soon" ? "bg-surface-container-lowest text-primary shadow-sm font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Opening Soon
                </button>
                <button 
                  type="button"
                  onClick={() => setStatus("open")}
                  className={`flex-1 py-3 px-4 rounded text-label-sm uppercase tracking-widest transition-all ${
                    status === "open" ? "bg-surface-container-lowest text-primary shadow-sm font-bold" : "text-on-surface-variant"
                  }`}
                >
                  Now Open
                </button>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-lg border-t border-outline-variant">
              <button 
                onClick={handleSave}
                className="w-full bg-primary text-on-primary py-4 px-8 rounded text-label-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-sm shadow-sm" 
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isSaved ? "check_circle" : "save"}
                </span>
                {isSaved ? "Saved Successfully" : "Save Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview (Right Column) */}
        <div className="lg:col-span-7 lg:sticky lg:top-8">
          <div className="flex items-center justify-between mb-md px-xs">
            <span className="text-label-sm text-on-surface-variant flex items-center gap-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-secondary block animate-pulse"></span>
              Live Preview
            </span>
            <span className="text-label-sm text-outline flex items-center gap-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
              Desktop View
            </span>
          </div>

          {/* Preview Canvas */}
          <div 
            className="w-full aspect-[16/9] md:aspect-[21/9] border border-outline-variant rounded-xl overflow-hidden shadow-xl relative flex items-center justify-center p-xl"
            style={{
              backgroundImage: heroImageUrl && !imageError
                ? `linear-gradient(rgba(245,245,247,0.85), rgba(245,245,247,0.85)), url("${heroImageUrl}")`
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "var(--color-surface)",
            }}
          >
            {/* Monogram Watermark (only when no image) */}
            {(!heroImageUrl || imageError) && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] text-[200px] font-display italic leading-none pointer-events-none select-none text-primary">
                Et
              </div>
            )}

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl px-lg">
              {/* Status Badge */}
              <div className="mb-lg">
                <span className="inline-block px-6 py-1.5 rounded-full border border-primary/20 bg-surface text-primary text-label-sm tracking-[0.2em] uppercase">
                  {status === "open" ? "Now Open" : "Opening Soon"}
                </span>
              </div>

              {/* Typography Stack */}
              <div className="flex flex-col gap-sm mb-lg">
                <h3 className="text-display-lg text-primary font-medium leading-none" style={{ fontSize: "clamp(32px, 5vw, 64px)" }}>
                  {mainTitle}
                </h3>
                <h4 className="text-headline-md text-primary/80 font-medium" dir="rtl">
                  {arabicSubtitle}
                </h4>
              </div>

              {/* Divider */}
              <div className="w-16 h-[1px] bg-primary/30 mb-lg mx-auto"></div>

              {/* Tagline */}
              <p className="text-body-lg text-on-surface-variant max-w-[448px] mx-auto leading-relaxed italic">
                {tagline}
              </p>

              {/* Mock CTA */}
              <div className="mt-xl opacity-40">
                <span className="inline-flex items-center justify-center px-10 py-3 border border-primary text-primary text-label-sm tracking-widest uppercase">
                  Explore Menu
                </span>
              </div>
            </div>
          </div>
          <div className="mt-md text-center">
            <p className="text-[10px] text-outline uppercase tracking-widest">Design system enforced: Minimalist Editorial, fixed padding, subtle tonal lifts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
