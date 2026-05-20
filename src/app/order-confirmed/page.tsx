import Link from "next/link";

export default function OrderConfirmed() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-margin-mobile md:p-margin-desktop animate-fade-in">
      <div className="max-w-[448px] w-full bg-surface-container-lowest border border-outline-variant rounded-lg p-xl flex flex-col items-center text-center shadow-sm">
        {/* Icon */}
        <div className="mb-lg flex items-center justify-center w-20 h-20 rounded-full bg-primary-fixed">
          <span className="material-symbols-outlined text-[40px] text-primary">
            check_circle
          </span>
        </div>
        
        {/* Heading */}
        <h1 className="text-headline-md text-primary mb-sm font-medium">
          Order Sent!
        </h1>
        
        {/* Body Text */}
        <p className="text-body-md text-on-surface-variant mb-xl">
          Thank you for your order. We&apos;ll confirm your details on WhatsApp shortly. Experience the art of refinement while we prepare your selection.
        </p>
        
        {/* Actions */}
        <div className="w-full flex flex-col gap-md">
          <Link 
            href="/menu"
            className="w-full py-4 px-8 rounded-full border border-primary text-primary text-label-sm hover:bg-surface-container-low transition-colors duration-300 uppercase tracking-widest text-center"
          >
            Back to Menu
          </Link>
          <Link 
            href="/"
            className="text-label-sm text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest"
          >
            Return Home
          </Link>
        </div>
        
        {/* Watermark */}
        <div className="mt-xl opacity-20 select-none pointer-events-none">
          <span className="font-display text-4xl italic text-primary">Et</span>
        </div>
      </div>
    </main>
  );
}
