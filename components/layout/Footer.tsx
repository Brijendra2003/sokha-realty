import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { NewsletterForm } from "./NewsletterForm";
import { Sprig, Sparkle } from "@/components/ui/Decor";

const LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Journal", href: "/blogs" },
    { label: "Careers", href: "/career" },
    { label: "Contact Us", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "RERA Disclosures", href: "/rera" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

const SOCIALS = [
  {
    icon: Instagram,
    href: "https://instagram.com/sokharealty",
    label: "Instagram",
  },
  { icon: Facebook, href: "https://facebook.com/sokharealty", label: "Facebook" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/company/sokharealty",
    label: "LinkedIn",
  },
  { icon: Youtube, href: "https://youtube.com/@sokharealty", label: "YouTube" },
];

export function Footer() {
  return (
    /* The domed top edge is what makes the footer read as the closing
       shape of the page rather than a slab bolted to the bottom. */
    <footer className="curve-top-lg relative overflow-hidden bg-navy-900 text-sand-200">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-noise opacity-60" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-blob bg-champagne-500/[0.07] blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-blob-2 bg-clay-500/[0.07] blur-3xl" />
        <Sprig className="right-[6%] top-24 hidden h-36 w-24 rotate-[190deg] text-sage-400/20 lg:block" />
        <Sprig className="left-[4%] bottom-32 hidden h-32 w-24 rotate-12 text-champagne-400/20 lg:block" />
      </div>

      {/* Newsletter */}
      <div className="container-max relative z-10 pt-24">
        <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm md:p-10">
          <div className="flex flex-col items-start justify-between gap-7 lg:flex-row lg:items-center">
            <div className="max-w-md">
              <span className="inline-flex items-center gap-2 rounded-full bg-champagne-500/15 px-4 py-1.5 font-mono text-2xs font-medium uppercase tracking-label text-champagne-300">
                <Sparkle className="h-2.5 w-2.5" />
                Stay Inspired
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                New launches, before they&apos;re public.
              </h3>
              <p className="mt-2 font-body text-sm text-sand-400">
                One email a month. Pre-launch pricing, construction updates and
                nothing else.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-max relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-blob bg-gold-gradient">
                <span className="font-display text-lg font-bold text-navy-900">
                  S
                </span>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl font-semibold tracking-tight text-white">
                  Sokha Realty
                </span>
                <span className="mt-1 font-mono text-2xs uppercase tracking-label text-champagne-400">
                  Est. 1995
                </span>
              </span>
            </Link>

            <p className="mb-7 max-w-xs font-body text-sm leading-relaxed text-sand-400">
              Three decades of building landmarks across Mumbai. Honest
              construction, premium living, trusted by 5,000+ families.
            </p>

            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sand-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne-500 hover:bg-champagne-500 hover:text-navy-900"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-5 font-mono text-2xs uppercase tracking-label text-champagne-400">
              Explore
            </h4>
            <ul className="space-y-3">
              {LINKS.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 font-body text-sm text-sand-400 transition-colors hover:text-champagne-300"
                  >
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 font-mono text-2xs uppercase tracking-label text-champagne-400">
              Legal
            </h4>
            <ul className="space-y-3">
              {LINKS.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group flex items-center gap-2 font-body text-sm text-sand-400 transition-colors hover:text-champagne-300"
                  >
                    <ArrowRight className="h-3 w-3 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-5 font-mono text-2xs uppercase tracking-label text-champagne-400">
              Connect
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 font-body text-sm text-sand-400">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-400" />
                <span>
                  Sokha Realty, 4th Floor, Andheri West, Mumbai&nbsp;–&nbsp;400053
                </span>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-3 font-body text-sm text-sand-400 transition-colors hover:text-champagne-300"
                >
                  <Phone className="h-4 w-4 shrink-0 text-champagne-400" />
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@sokharealty.com"
                  className="flex items-center gap-3 font-body text-sm text-sand-400 transition-colors hover:text-champagne-300"
                >
                  <Mail className="h-4 w-4 shrink-0 text-champagne-400" />
                  info@sokharealty.com
                </a>
              </li>
            </ul>

            <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
              <p className="font-mono text-2xs uppercase tracking-label text-sand-500">
                MahaRERA Reg. No.
              </p>
              <p className="mt-0.5 font-mono text-sm text-sand-300">
                P51800000000
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container-max flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="text-center font-body text-xs text-sand-500">
            © {new Date().getFullYear()} Sokha Realty Pvt. Ltd. All rights
            reserved.
          </p>
          <p className="text-center font-body text-xs text-sand-500">
            * All images are artistic impressions. See our{" "}
            <Link
              href="/disclaimer"
              className="underline underline-offset-2 transition-colors hover:text-champagne-300"
            >
              Disclaimer
            </Link>{" "}
            and{" "}
            <Link
              href="/rera"
              className="underline underline-offset-2 transition-colors hover:text-champagne-300"
            >
              RERA Disclosures
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
