import Link from "next/link";
import { ArrowRight, Phone, MapPin } from "lucide-react";
import { Sprig, Sparkle, DotScatter } from "@/components/ui/Decor";

/* ════════════════════════════════════════════════════════════════════
   Closing CTA

   A single warm terracotta card floating on the page rather than a
   full-bleed dark band — the "let's create together" panel from the
   reference boards, adapted to a site-visit booking.
   ════════════════════════════════════════════════════════════════════ */

export function CtaSection() {
  return (
    <section className="relative bg-white pb-24 pt-8 dark:bg-navy-900 md:pb-32">
      <div className="container-max">
        <div className="relative overflow-hidden rounded-[36px] bg-clay-gradient px-7 py-16 shadow-soft-lg md:rounded-[48px] md:px-16 md:py-20">
          {/* Ornament layer */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-blob bg-white/10" />
            <div className="absolute -bottom-24 -right-10 h-72 w-72 rounded-blob-2 bg-navy-900/10" />
            <Sprig className="left-[3%] bottom-4 hidden h-36 w-24 rotate-[8deg] text-white/25 lg:block" />
            <Sprig className="right-[4%] top-6 hidden h-32 w-24 rotate-[195deg] text-white/20 lg:block" />
            <DotScatter
              className="right-[14%] bottom-10 hidden text-white/50 xl:grid"
              rows={3}
              cols={4}
            />
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 font-mono text-2xs font-medium uppercase tracking-label text-white backdrop-blur-sm">
                <Sparkle className="h-2.5 w-2.5" />
                Let&apos;s Find Your Home
              </span>

              <h2 className="heading-lg mt-5 text-balance text-white">
                Your next front door is{" "}
                <em className="font-display font-normal italic text-champagne-200">
                  one visit away.
                </em>
              </h2>

              <p className="mt-5 max-w-lg text-pretty font-body text-white/85">
                Walk a show home, meet the site team and see the finish quality
                for yourself. No pressure, no sales script — just an honest
                look at what you&apos;d be buying.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-8 py-4 font-body text-sm font-semibold text-clay-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:shadow-soft-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-clay-500"
                >
                  Schedule a Site Visit
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <a
                  href="tel:+919876543210"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/40 px-8 py-4 font-body text-sm font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* Reassurance panel */}
            <div className="rounded-[28px] border border-white/25 bg-white/12 p-7 backdrop-blur-sm">
              <p className="font-mono text-2xs uppercase tracking-label text-white/75">
                Visit us
              </p>
              <p className="mt-3 flex items-start gap-3 font-body text-white">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-champagne-200" />
                Sokha Realty, 4th Floor, Andheri West, Mumbai&nbsp;–&nbsp;400053
              </p>

              <div className="mt-6 space-y-3 border-t border-white/25 pt-6">
                {[
                  "Site visits 7 days a week",
                  "Home-loan desk on site",
                  "MahaRERA registered projects",
                ].map((line) => (
                  <p
                    key={line}
                    className="flex items-center gap-3 font-body text-sm text-white/90"
                  >
                    <Sparkle className="h-3 w-3 shrink-0 text-champagne-200" />
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
