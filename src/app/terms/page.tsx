import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-xxl animate-fade-in">
        {/* Header Section */}
        <header className="mb-xl text-center md:text-left flex flex-col space-y-md">
          <p className="text-label-sm text-secondary uppercase tracking-[0.2em]">Service Agreement</p>
          <h1 className="text-display-lg-mobile md:text-display-lg text-primary leading-tight">
            Terms of Service
          </h1>
          <div className="w-16 h-[1px] bg-primary my-md mx-auto md:mx-0"></div>
          <p className="text-body-md text-on-surface-variant max-w-prose">
            Last Updated: May 17, 2026. Please read this Service Agreement carefully before using the Elite Touch Cafe website, checkout systems, and administrative interfaces.
          </p>
        </header>

        {/* Content Section */}
        <article className="space-y-xl text-on-surface-variant">
          
          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">1. Acceptable Use of Services</h2>
            <p className="text-body-md leading-relaxed">
              By accessing and using our platforms, you agree to comply with all applicable regional laws and avoid any behavior that disrupts, harms, or degrades the performance of the Elite Touch Cafe checkout systems or administrative control panels.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">2. Menu Listings and Pricing</h2>
            <p className="text-body-md leading-relaxed">
              Elite Touch Cafe makes every effort to ensure accurate representation of digital catalog details, pricing structures, allergen indicators, and stock levels. We reserve the absolute right to modify product specifications, withdraw catalog items, or update pricing without notice.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">3. Ordering and Cancellations</h2>
            <p className="text-body-md leading-relaxed">
              Submitting a checkout form constitutes a binding purchase offer. Elite Touch Cafe reserves the right to decline or cancel orders in cases of incorrect inventory data, supply chain shortages, or processing anomalies. In such events, prompt credit refunds are initiated immediately.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">4. Intellectual Property</h2>
            <p className="text-body-md leading-relaxed">
              All branding elements, decorative visual assets, custom monograms, layout designs, proprietary copy text, and source configurations remain the exclusive intellectual property of Elite Touch Cafe. Replication or commercial extraction of assets is strictly prohibited.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">5. Limits of Liability</h2>
            <p className="text-body-md leading-relaxed">
              Under no circumstances shall Elite Touch Cafe, its directors, partners, or logistics affiliates be liable for direct or indirect losses resulting from server outages, platform maintenance delays, custom cart session interruptions, or delivery disruptions.
            </p>
          </section>

          <section className="border-t border-outline-variant pt-lg mt-xxl">
            <h3 className="text-label-sm text-secondary uppercase tracking-[0.2em] mb-sm">Legal Administration</h3>
            <p className="text-body-md">
              Elite Touch Cafe Legal and Compliance Division<br/>
              Email: legal@elitetouchcafe.com<br/>
              Phone: +966 12 345 678
            </p>
          </section>

        </article>
      </main>

      <Footer />
    </>
  );
}
