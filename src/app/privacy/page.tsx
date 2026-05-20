import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop py-xxl animate-fade-in">
        {/* Header Section */}
        <header className="mb-xl text-center md:text-left flex flex-col space-y-md">
          <p className="text-label-sm text-secondary uppercase tracking-[0.2em]">Legal Framework</p>
          <h1 className="text-display-lg-mobile md:text-display-lg text-primary leading-tight">
            Privacy Policy
          </h1>
          <div className="w-16 h-[1px] bg-primary my-md mx-auto md:mx-0"></div>
          <p className="text-body-md text-on-surface-variant max-w-prose">
            Last Updated: May 17, 2026. This Privacy Policy details how Elite Touch Cafe collects, protects, and handles your information when you interact with our digital platforms.
          </p>
        </header>

        {/* Content Section */}
        <article className="space-y-xl text-on-surface-variant">
          
          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">1. Collection of Information</h2>
            <p className="text-body-md leading-relaxed">
              We collect information you provide directly to us when making purchases, subscribing to newsletters, or contacting us. This includes your name, email address, phone number, physical address, and payment transaction details needed to fulfill orders.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">2. Local Storage and Cookies</h2>
            <p className="text-body-md leading-relaxed">
              Elite Touch Cafe uses essential cookies and browser local storage mechanisms to persist your current cart item selection, operational store adjustments, active order status, and session security. These technologies are crucial to delivering a secure and streamlined checkout flow.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">3. Processing of Payments</h2>
            <p className="text-body-md leading-relaxed">
              All payment transactions are encrypted and processed securely by external, industry-certified payment gateway processors. Elite Touch Cafe does not directly record, store, or have access to raw credit card details or bank credentials on our digital systems.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">4. Data Sharing and Protection</h2>
            <p className="text-body-md leading-relaxed">
              We do not sell, lease, or rent customer personal details to third-party advertisers. Personal information is only shared with trusted service providers to the extent necessary to deliver your physical orders, fulfill deliveries, or send operational status alerts.
            </p>
          </section>

          <section className="space-y-sm">
            <h2 className="text-headline-sm text-primary">5. User Rights and Controls</h2>
            <p className="text-body-md leading-relaxed">
              You maintain the right to inspect, update, or request the complete deletion of any stored personal information we possess. To submit a data removal request or ask questions about our compliance standards, please get in touch with our security compliance team directly.
            </p>
          </section>

          <section className="border-t border-outline-variant pt-lg mt-xxl">
            <h3 className="text-label-sm text-secondary uppercase tracking-[0.2em] mb-sm">Contact Administration</h3>
            <p className="text-body-md">
              Elite Touch Cafe Legal and Compliance Division<br/>
              Email: compliance@elitetouchcafe.com<br/>
              Phone: +966 12 345 678
            </p>
          </section>

        </article>
      </main>

      <Footer />
    </>
  );
}
