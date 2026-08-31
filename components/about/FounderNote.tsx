"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Blob, Sprig, Sparkle } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

export function FounderNote() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-24 dark:bg-navy-800 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="champagne" className="-left-36 top-1/4 h-[26rem] w-[26rem]" />
        <Blob tone="clay" className="-right-24 bottom-10 h-80 w-80" />
        <Sprig className="right-[7%] top-20 hidden h-32 w-24 rotate-[200deg] text-sage-400/50 lg:block" />
      </div>

      <div className="container-max relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Portrait */}
          <div
            className={cn(
              "relative transition-all duration-700 ease-expo-out",
              inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
            )}
          >
            <div className="organic-frame relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-sand-200 shadow-soft-lg dark:bg-navy-700">
              <Image
                src="/images/Dumy_Image_1.png"
                alt="Suresh Sokha, Founder and Managing Director of Sokha Realty"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>

            {/* Floating attribution chip */}
            <div className="absolute -bottom-4 right-2 flex max-w-[240px] items-center gap-3 rounded-full border border-sand-300 bg-white px-5 py-3 shadow-soft dark:border-navy-600 dark:bg-navy-700 sm:right-0">
              <span className="icon-blob blob-clay h-10 w-10">
                <Sparkle className="h-4 w-4" />
              </span>
              <p className="font-mono text-2xs uppercase leading-snug tracking-wider text-navy-500 dark:text-sand-400">
                Est. 1995 · Three decades of craft
              </p>
            </div>
          </div>

          {/* Message */}
          <div
            className={cn(
              "transition-all delay-150 duration-700 ease-expo-out",
              inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
            )}
          >
            <span className="eyebrow-pill mb-5">
              <Sparkle className="h-2.5 w-2.5" />
              Founder&apos;s Message
            </span>

            <h2 className="heading-md text-balance text-navy-800 dark:text-sand-100">
              We build homes,{" "}
              <em className="script-accent">not just buildings.</em>
            </h2>

            <div className="mt-7 space-y-4 font-body text-navy-600 dark:text-sand-300">
              <p>
                When I laid the foundation for our first project in 1995, I made
                myself a promise: every home we build would be one I&apos;d be
                happy to live in. That single rule has settled every difficult
                decision for three decades.
              </p>
              <p>
                Looking at the skyline we&apos;ve helped shape across Mumbai, I
                am reminded that real estate isn&apos;t really about
                construction. It&apos;s about the families who will call these
                spaces home long after we&apos;ve handed over the keys.
              </p>
            </div>

            <figure className="mt-9 rounded-[24px] bg-sand-100 p-7 dark:bg-navy-900">
              <Quote className="h-6 w-6 text-clay-400" />
              <blockquote className="mt-3 font-display text-lg italic leading-relaxed text-navy-700 dark:text-sand-200">
                Quality isn&apos;t what you see at handover. It&apos;s what
                you don&apos;t have to fix fifteen years later.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-4">
                <span className="h-px w-10 bg-champagne-500" />
                <div>
                  <p className="font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                    Suresh Sokha
                  </p>
                  <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400">
                    Founder &amp; Managing Director
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
