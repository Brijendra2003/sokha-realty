import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export function CtaSection() {
  return (
    <section className="relative py-28 md:py-36 bg-charcoal-900 overflow-hidden min-h-[460px]">
      {/* Fine grain texture for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Layered gradient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gold-500/[0.07] blur-[120px]" />
        <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-gold-400/[0.06] blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-gold-600/[0.05] blur-[100px]" />
      </div>

      {/* Top and bottom hairline borders for a "framed" premium feel */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />

      <div className="container-max relative z-10 max-w-6xl mx-auto text-center">
        {/* Label with flanking lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-10 bg-gold-500/40" />
          <span className="section-label text-gold-400 text-sm tracking-[0.25em] uppercase">
            Start Your Journey
          </span>
          <span className="h-px w-10 bg-gold-500/40" />
        </div>

        <h2 className="heading-xl text-white max-w-2xl mx-auto text-balance mb-8 leading-[1.15]">
          Your Dream Home Is{" "}
          <em className="text-gradient-gold not-italic">One Visit Away</em>
        </h2>

        <p className="font-body text-charcoal-300 text-lg leading-relaxed max-w-xl mx-auto mb-12">
          Schedule a site visit today and experience the Sokha Realty
          difference firsthand. Walk through our premium residences and discover
          the craftsmanship that sets us apart.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/contact"
            className="group btn-primary text-base px-9 py-4 rounded-xl flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold-lg"
          >
            Schedule a Site Visit
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+919876543210"
            className="group flex items-center gap-3 text-base text-white px-9 py-4 rounded-xl border border-white/15 bg-white/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-gold-400/50 hover:bg-white/5"
          >
            <Phone className="w-4 h-4 text-gold-400 transition-transform duration-300 group-hover:scale-110" />
            +91 98765 43210
          </a>
        </div>

        <div className="mt-10 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-charcoal-600" />
          <p className="text-sm text-charcoal-500 tracking-wide">
            30+ years of trust in every home we build
          </p>
          <span className="h-px w-6 bg-charcoal-600" />
        </div>
      </div>
    </section>
  );
}
