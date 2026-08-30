"use client";

import { Target, Eye, Heart, Award } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    icon: Target,
    title: "Integrity",
    desc: "Transparent dealings, honest timelines, and ethical business practices in every transaction.",
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "We don't just build for today — we design spaces that remain relevant for generations.",
    color: "text-gold-400",
    bg: "bg-gold-400/10 border-gold-400/20",
  },
  {
    icon: Heart,
    title: "Customer-First",
    desc: "Every decision starts with one question: how does this serve our homeowners?",
    color: "text-rose-400",
    bg: "bg-rose-400/10 border-rose-400/20",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Uncompromising quality standards from foundation to final finish.",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
];

export function ValuesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-py bg-white dark:bg-charcoal-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full bg-gold-500/5 blur-3xl pointer-events-none" />

      <div className="container-max relative z-10">
        <div className="text-center mb-14">
          <span className="section-label">What Drives Us</span>
          <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
            Our Core Values
          </h2>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={cn(
                "card p-7 text-center group cursor-default transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={cn(
                  "w-12 h-12 mx-auto rounded-sm border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300",
                  v.bg
                )}
              >
                <v.icon className={cn("w-5 h-5", v.color)} />
              </div>
              <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-2">
                {v.title}
              </h3>
              <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
