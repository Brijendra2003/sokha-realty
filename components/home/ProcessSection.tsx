"use client";

import Link from "next/link";
import { ArrowRight, Search, PenTool, HardHat, KeyRound } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, Squiggle } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

/* ════════════════════════════════════════════════════════════════════
   Process

   Four numbered steps with hand-drawn connectors between them. Buying
   a home is the largest transaction most people ever make; showing the
   sequence plainly is the single highest-value UX addition on the page.
   ════════════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    icon: Search,
    title: "Discover",
    desc: "We start with your life — commute, family, budget — then shortlist only what genuinely fits.",
    blob: "blob-champagne",
  },
  {
    icon: PenTool,
    title: "Plan",
    desc: "Walk the floor plans, compare configurations and lock the layout that suits you.",
    blob: "blob-clay",
  },
  {
    icon: HardHat,
    title: "Build",
    desc: "Monthly construction updates, transparent milestones and open site access throughout.",
    blob: "blob-sage",
  },
  {
    icon: KeyRound,
    title: "Handover",
    desc: "Keys on the promised date, a full snag walkthrough and a manager you can still call.",
    blob: "blob-champagne",
  },
];

export function ProcessSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="relative overflow-hidden bg-sand-200 py-24 dark:bg-navy-900 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="champagne" className="left-1/2 top-0 h-96 w-96 -translate-x-1/2" />
      </div>

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From first visit to"
          accent="front door key."
          lead="Four clear stages, no surprises in between. You always know exactly where your home is."
          tone="clay"
          className="mb-16"
        />

        <div ref={ref} className="relative">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <div
                key={step.title}
                className={cn(
                  "group relative text-center transition-all duration-600 ease-expo-out",
                  inView
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0",
                )}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                {/* Connector — drawn between steps, never after the last */}
                {i < STEPS.length - 1 && (
                  <Squiggle className="absolute -right-10 top-9 hidden h-5 w-20 text-champagne-400/70 lg:block" />
                )}

                <div className="relative mx-auto mb-6 w-fit">
                  <div className={cn("icon-blob h-20 w-20", step.blob)}>
                    <step.icon className="h-7 w-7" />
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-full bg-navy-800 font-mono text-xs font-semibold text-champagne-300 shadow-soft dark:bg-champagne-500 dark:text-navy-900">
                    {i + 1}
                  </span>
                </div>

                <h3 className="mb-2.5 font-display text-xl font-semibold text-navy-800 dark:text-sand-100">
                  {step.title}
                </h3>
                <p className="mx-auto max-w-xs font-body text-sm leading-relaxed text-navy-500 dark:text-sand-400">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/contact" className="btn-primary group">
            Book a Site Visit
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link href="/projects" className="btn-secondary">
            Browse Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
