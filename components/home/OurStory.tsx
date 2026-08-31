"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { Blob, Sprig, Sparkle } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Our Story

   The narrative beat between the portfolio and the proof. An organic
   photo silhouette on the left, the founder's voice on the right, and
   an arched inset that overlaps both — the layered composition the
   reference boards use to break up an otherwise flat grid of cards.
   ════════════════════════════════════════════════════════════════════ */

export function OurStory() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white py-24 dark:bg-navy-800 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="clay" className="-left-40 top-10 h-[26rem] w-[26rem]" />
        <Blob tone="champagne" className="-right-32 bottom-0 h-96 w-96" />
        <Sprig className="left-[8%] bottom-16 hidden h-32 w-24 rotate-[15deg] text-sage-400/50 lg:block" />
      </div>

      <div className="container-max relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Imagery */}
          <div
            className={cn(
              "relative transition-all duration-700 ease-expo-out",
              inView ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0",
            )}
          >
            {/* Primary organic silhouette */}
            <div className="organic-frame relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden bg-sand-200 shadow-soft-lg dark:bg-navy-700">
              <Image
                src="/images/Dumy_Image_1.png"
                alt="Sokha Realty's founding team on site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 45vw"
              />
            </div>

            {/* Arched inset, overlapping the silhouette */}
            <div className="arch-frame absolute -bottom-6 -right-2 h-44 w-32 overflow-hidden border-4 border-white bg-sand-200 shadow-soft-lg dark:border-navy-800 dark:bg-navy-700 sm:-right-4 sm:h-56 sm:w-40">
              <Image
                src="/images/BG_ING_1.jpeg"
                alt="A completed Sokha Realty residence"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            {/* Floating credential chip */}
            <div className="absolute -left-2 top-6 flex items-center gap-3 rounded-full border border-sand-300 bg-white px-5 py-3 shadow-soft dark:border-navy-600 dark:bg-navy-700 sm:-left-6">
              <span className="icon-blob blob-champagne h-9 w-9">
                <Sparkle className="h-3.5 w-3.5" />
              </span>
              <div className="leading-tight">
                <p className="font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                  30 years
                </p>
                <p className="font-mono text-2xs uppercase tracking-label text-navy-500 dark:text-sand-400">
                  of building
                </p>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div
            className={cn(
              "transition-all delay-150 duration-700 ease-expo-out",
              inView ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0",
            )}
          >
            <span className="eyebrow-pill-clay mb-4">
              <Sparkle className="h-2.5 w-2.5" />
              Our Story
            </span>

            <h2 className="heading-lg text-balance text-navy-800 dark:text-sand-100">
              Thoughtful homes.{" "}
              <em className="script-accent script-accent-clay">
                Meaningful lives.
              </em>
            </h2>

            <p className="lead mt-6 text-pretty">
              We laid our first foundation in Andheri in 1995 with one rule:
              build only what we would happily live in ourselves. Three decades
              on, that rule still settles every argument in the room.
            </p>

            <p className="mt-4 font-body text-navy-500 dark:text-sand-400">
              From structural steel to the softness of a door handle, the small
              decisions are where a home is actually made — and they are the
              ones we refuse to rush.
            </p>

            {/* Founder pull-quote */}
            <figure className="mt-9 rounded-[24px] bg-sand-100 p-7 dark:bg-navy-900">
              <Quote className="h-6 w-6 text-clay-400" />
              <blockquote className="mt-3 font-display text-lg italic leading-relaxed text-navy-700 dark:text-sand-200">
                We build homes, not just buildings. The difference shows up
                fifteen years later.
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-champagne-500" />
                <div>
                  <p className="font-display font-semibold text-navy-800 dark:text-sand-100">
                    Suresh Sokha
                  </p>
                  <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400">
                    Founder &amp; Managing Director
                  </p>
                </div>
              </figcaption>
            </figure>

            <Link href="/about" className="btn-secondary group mt-9">
              More About Us
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
