"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

export function FounderNote() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="section-py bg-white dark:bg-charcoal-800 relative overflow-hidden"
    >
      {/* Decorative background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div
            className={cn(
              "relative transition-all duration-700",
              inView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            )}
          >
            {/* Offset gold frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-gold-500/40 rounded-lg hidden sm:block" />

            <div className="relative h-[420px] sm:h-[480px] rounded-lg overflow-hidden bg-ivory-200 dark:bg-charcoal-700 shadow-card dark:shadow-dark-card">
              <Image
                src="/images/Dumy_Image_1.png"
                alt="Founder of Sokha Realty"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </div>

            {/* Floating attribution badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white dark:bg-charcoal-700 border border-ivory-300 dark:border-charcoal-600 rounded-lg shadow-gold-lg px-5 py-4 flex items-center gap-3 max-w-[220px]">
              <Quote className="w-6 h-6 text-gold-500 shrink-0" />
              <p className="font-mono text-2xs leading-snug tracking-wide uppercase text-charcoal-500 dark:text-charcoal-300">
                Est. 1995 &middot; Three Decades of Craft
              </p>
            </div>
          </div>

          {/* Text */}
          <div
            className={cn(
              "transition-all duration-700 delay-150",
              inView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            )}
          >
            <span className="section-label">Founder's Message</span>
            <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6 relative">
              <Quote className="w-8 h-8 text-gold-300 dark:text-gold-800 -ml-1 mb-2" />
              "We Build Homes, Not Just Buildings"
            </h2>
            <p className="font-body text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
              When I laid the foundation for our first project in 1995, I
              made a promise to myself: every home we build would be one I'd
              be proud to live in myself. That principle has guided Sokha
              Builders for three decades.
            </p>
            <p className="font-body text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-8">
              Today, as we look at the skyline we've helped shape across
              Mumbai, I'm reminded that real estate isn't just about
              construction — it's about the families who'll call these
              spaces home for generations to come.
            </p>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gold-500/50" />
              <div>
                <p className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100">
                  Mr. Suresh Sokha
                </p>
                <p className="font-mono text-xs text-gold-500 tracking-wide">
                  Founder &amp; Managing Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
