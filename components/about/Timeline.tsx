"use client";

import { Building2, Landmark, Briefcase, Leaf, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const TIMELINE = [
  {
    year: "1995",
    title: "The Foundation",
    desc: "Sokha Realty founded with a single residential project in Andheri.",
    icon: Building2,
  },
  {
    year: "2003",
    title: "First Landmark",
    desc: "Delivered our first high-rise — Sokha Towers, redefining Mumbai's western suburbs skyline.",
    icon: Landmark,
  },
  {
    year: "2011",
    title: "Commercial Expansion",
    desc: "Entered commercial real estate with Sokha Business Park in BKC.",
    icon: Briefcase,
  },
  {
    year: "2018",
    title: "Green Building Certification",
    desc: "Became one of the first developers in the region with IGBC Gold-certified projects.",
    icon: Leaf,
  },
  {
    year: "2024",
    title: "5,000+ Families",
    desc: "Crossed the milestone of housing over 5,000 families across 42+ projects.",
    icon: Users,
  },
];

function TimelineItem({
  item,
  isEven,
}: {
  item: (typeof TIMELINE)[number];
  isEven: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.4 });

  return (
    <div ref={ref} className="relative flex items-center">
      {/* Gold dot */}
      <div
        className={cn(
          "absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 ring-4 ring-ivory-100 dark:ring-charcoal-900 z-10 transition-transform duration-500",
          inView ? "scale-100 animate-gold-pulse" : "scale-0"
        )}
      />

      {/* Card — mobile: always right of dot | desktop: alternates */}
      <div
        className={cn(
          "w-full pl-14 md:pl-0 md:w-1/2 transition-all duration-700",
          isEven ? "md:pr-12 md:text-right md:ml-0" : "md:pl-14 md:ml-auto",
          inView
            ? "opacity-100 translate-y-0"
            : cn("opacity-0 translate-y-6")
        )}
      >
        <div className="card p-5 md:p-6 group hover:-translate-y-1">
          <div
            className={cn(
              "w-10 h-10 rounded-sm bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300",
              isEven ? "md:ml-auto" : ""
            )}
          >
            <item.icon className="w-5 h-5 text-gold-500" />
          </div>
          <p className="font-mono text-xs font-bold text-gold-500 mb-1 tracking-wide">
            {item.year}
          </p>
          <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-1">
            {item.title}
          </h3>
          <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
      <div className="container-max">
        <div className="text-center mb-16">
          <span className="section-label">Our Journey</span>
          <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
            Milestones Along the Way
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical gradient line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent" />

          <div className="space-y-12">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} isEven={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
