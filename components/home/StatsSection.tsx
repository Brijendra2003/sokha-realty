"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Building2, Users, Award, MapPin } from "lucide-react";
import { Blob, Sprig, Sparkle } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

/* Each stat owns a tint so the grid reads as four soft tiles rather
   than one uniform block — the "Our Impact" treatment from the brief. */
const STATS = [
  {
    icon: Building2,
    value: 42,
    suffix: "+",
    label: "Projects Delivered",
    detail: "Across Mumbai & MMR",
    tile: "bg-champagne-100 dark:bg-champagne-500/12",
    figure: "text-champagne-700 dark:text-champagne-300",
  },
  {
    icon: Users,
    value: 5000,
    suffix: "+",
    label: "Happy Families",
    detail: "Trusted homeowners",
    tile: "bg-clay-100 dark:bg-clay-500/12",
    figure: "text-clay-600 dark:text-clay-300",
  },
  {
    icon: Award,
    value: 30,
    suffix: "+",
    label: "Years of Excellence",
    detail: "Est. 1995",
    tile: "bg-sage-100 dark:bg-sage-500/12",
    figure: "text-sage-700 dark:text-sage-300",
  },
  {
    icon: MapPin,
    value: 18,
    suffix: "",
    label: "Prime Locations",
    detail: "In Greater Mumbai",
    tile: "bg-navy-100 dark:bg-navy-500/20",
    figure: "text-navy-700 dark:text-navy-100",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1800;
    const step = (target / duration) * 16;

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="tabular">
      {count.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    /* Curved top lets this band rise over the cinematic hero above it,
       which is what turns the hard video edge into a soft transition. */
    <section className="relative -mt-16 rounded-t-[3rem] bg-sand-100 pb-20 pt-24 dark:bg-navy-900 md:-mt-24 md:rounded-t-[5rem] md:pb-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-[3rem] md:rounded-t-[5rem]">
        <Blob tone="clay" className="-left-24 top-10 h-72 w-72" />
        <Blob tone="champagne" className="-right-20 top-40 h-80 w-80" />
        <Sprig className="right-[6%] top-16 hidden h-28 w-20 rotate-12 text-sage-400/60 lg:block" />
      </div>

      <div className="container-max relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          {/* Intro */}
          <div>
            <span className="eyebrow-pill mb-4">
              <Sparkle className="h-2.5 w-2.5" />
              Our Impact
            </span>
            <h2 className="heading-lg text-balance text-navy-800 dark:text-sand-100">
              Built at scale,{" "}
              <em className="script-accent">delivered one at a time.</em>
            </h2>
            <p className="lead mt-5 text-pretty">
              Numbers only matter because of the families behind them. Every
              figure here is a key handed over, on the day we promised it.
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-10 bg-champagne-500" />
              <p className="font-mono text-2xs uppercase tracking-label text-navy-500 dark:text-sand-400">
                MahaRERA registered · Est. 1995
              </p>
            </div>
          </div>

          {/* Tiles */}
          <div ref={ref} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "tile group relative overflow-hidden",
                  stat.tile,
                  "hover:-translate-y-1.5 hover:shadow-soft-lg",
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0",
                  /* Stagger the two columns so the grid assembles
                     diagonally rather than as one slab. */
                  i % 2 === 1 && "sm:mt-8",
                )}
                style={{ transitionDelay: `${i * 110}ms` }}
              >
                {/* The blob sits on white inside an already-tinted tile,
                    so it reads as a cut-out rather than a second wash. */}
                <div
                  className={cn(
                    "icon-blob mb-5 h-12 w-12 bg-white/75 dark:bg-white/10",
                    stat.figure,
                  )}
                >
                  <stat.icon className="h-5 w-5" />
                </div>

                <p
                  className={cn(
                    "font-display text-4xl font-semibold md:text-5xl",
                    stat.figure,
                  )}
                >
                  <Counter target={stat.value} suffix={stat.suffix} />
                </p>

                <p className="mt-2 font-body text-sm font-semibold text-navy-800 dark:text-sand-100">
                  {stat.label}
                </p>
                <p className="font-mono text-2xs uppercase tracking-wider text-navy-500 dark:text-sand-400">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
