"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, Sprig } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Rahul & Priya Sharma",
    project: "Sokha Serene Heights, Powai",
    text: "Three years in our Sokha home and not a single crack or complaint. The team stayed responsive right through the process — and after it.",
    rating: 5,
    type: "3 BHK Residents",
    initials: "RS",
    tint: "blob-champagne",
  },
  {
    name: "Vikram Malhotra",
    project: "Sokha Greens, Kandivali",
    text: "I bought a 2 BHK purely as a rental. It was delivered on time and the yield has been consistently strong. Thoroughly professional outfit.",
    rating: 5,
    type: "Investor",
    initials: "VM",
    tint: "blob-clay",
  },
  {
    name: "Ananya & Siddharth Joshi",
    project: "Sokha Residences, Thane",
    text: "From the first site visit to possession, every interaction was smooth. Our children have taken over the green spaces entirely.",
    rating: 5,
    type: "2 BHK Residents",
    initials: "AJ",
    tint: "blob-sage",
  },
  {
    name: "Deepak Nair",
    project: "Sokha Commercial Centre, Andheri",
    text: "I moved my office here last year. The location, the design and the building services are exactly what was promised at booking.",
    rating: 5,
    type: "Commercial Owner",
    initials: "DN",
    tint: "blob-navy",
  },
];

function TestimonialCard({
  t,
  featured,
}: {
  t: (typeof TESTIMONIALS)[number];
  featured?: boolean;
}) {
  return (
    <figure
      className={cn(
        "card relative flex h-full flex-col p-8",
        featured && "lg:scale-[1.03] lg:shadow-soft-lg",
      )}
    >
      <Quote className="h-7 w-7 shrink-0 text-clay-300 dark:text-clay-500/60" />

      <div className="mt-4 flex items-center gap-1">
        {Array.from({ length: t.rating }).map((_, i) => (
          <Star
            key={i}
            className="h-3.5 w-3.5 fill-champagne-400 text-champagne-400"
          />
        ))}
      </div>

      <blockquote className="mt-4 flex-1 font-body text-[15px] leading-relaxed text-navy-600 dark:text-sand-300">
        {t.text}
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-4 border-t border-sand-300 pt-6 dark:border-navy-600">
        {/* Initials medallion stands in for a photo we don't have rights to */}
        <span
          className={cn(
            "icon-blob h-12 w-12 font-display text-sm font-semibold",
            t.tint,
          )}
        >
          {t.initials}
        </span>
        <div className="min-w-0">
          <p className="truncate font-display font-semibold text-navy-800 dark:text-sand-100">
            {t.name}
          </p>
          <p className="truncate font-mono text-2xs uppercase tracking-wider text-champagne-700 dark:text-champagne-400">
            {t.type} · {t.project}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  /* Desktop shows three at once; mobile pages through them one at a
     time. One index drives both so the controls stay honest. */
  const [start, setStart] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const advance = useCallback(
    (dir: 1 | -1) =>
      setStart((s) => (s + dir + TESTIMONIALS.length) % TESTIMONIALS.length),
    [],
  );

  useEffect(() => {
    if (!autoPlay) return;
    const id = setInterval(() => advance(1), 6000);
    return () => clearInterval(id);
  }, [autoPlay, advance]);

  const go = (dir: 1 | -1) => {
    setAutoPlay(false);
    advance(dir);
  };

  const visible = [0, 1, 2].map(
    (offset) => TESTIMONIALS[(start + offset) % TESTIMONIALS.length],
  );

  return (
    <section className="curve-top-lg curve-bottom-lg relative overflow-hidden bg-sage-50 py-24 dark:bg-navy-800 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="sage" className="-left-24 top-16 h-80 w-80" />
        <Blob tone="clay" className="-right-24 bottom-16 h-80 w-80" />
        <Sprig className="left-[5%] bottom-20 hidden h-28 w-20 rotate-[190deg] text-sage-500/40 lg:block" />
        <Sprig className="right-[6%] top-24 hidden h-28 w-20 -rotate-12 text-clay-400/40 lg:block" />
      </div>

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Kind Words"
          title="What it's like to"
          accent="live here."
          lead="Unedited notes from residents and investors across our Mumbai portfolio."
          className="mb-16"
        />

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((t, i) => (
            <div
              key={t.name}
              className={cn(
                "transition-all duration-500 ease-expo-out",
                i === 1 && "hidden md:block",
                i === 2 && "hidden lg:block",
              )}
            >
              <TestimonialCard t={t} featured={i === 1} />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-center gap-5">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonials"
            className="btn-round"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                onClick={() => {
                  setAutoPlay(false);
                  setStart(i);
                }}
                aria-label={`Show testimonial from ${t.name}`}
                aria-current={i === start}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === start
                    ? "w-7 bg-champagne-500"
                    : "w-2 bg-sand-400 hover:bg-champagne-300 dark:bg-navy-600",
                )}
              />
            ))}
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Next testimonials"
            className="btn-round"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
