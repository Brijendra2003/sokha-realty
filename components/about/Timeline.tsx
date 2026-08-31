"use client";

import { Building2, Landmark, Briefcase, Leaf, Users } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, Sprig } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

const TIMELINE = [
  {
    year: "1995",
    title: "The Foundation",
    desc: "Sokha Realty is founded with a single residential project in Andheri.",
    icon: Building2,
    blob: "blob-champagne",
  },
  {
    year: "2003",
    title: "First Landmark",
    desc: "Sokha Towers tops out — our first high-rise, and a new line on the western suburbs skyline.",
    icon: Landmark,
    blob: "blob-clay",
  },
  {
    year: "2011",
    title: "Commercial Expansion",
    desc: "We enter commercial real estate with Sokha Business Park in BKC.",
    icon: Briefcase,
    blob: "blob-sage",
  },
  {
    year: "2018",
    title: "Green Certification",
    desc: "Among the first developers in the region with IGBC Gold-certified projects.",
    icon: Leaf,
    blob: "blob-sage",
  },
  {
    year: "2024",
    title: "5,000+ Families",
    desc: "We cross the milestone of housing over 5,000 families across 42+ projects.",
    icon: Users,
    blob: "blob-champagne",
  },
];

function TimelineItem({
  item,
  isEven,
}: {
  item: (typeof TIMELINE)[number];
  isEven: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.35 });

  return (
    <div ref={ref} className="relative flex items-center">
      {/* Year medallion, centred on the rail */}
      <div
        className={cn(
          "absolute left-6 z-10 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-blob",
          "bg-white font-mono text-2xs font-semibold text-champagne-700 shadow-soft",
          "ring-4 ring-sand-100 transition-all duration-600 ease-expo-out",
          "dark:bg-navy-700 dark:text-champagne-300 dark:ring-navy-900",
          "md:left-1/2",
          inView ? "scale-100 opacity-100" : "scale-50 opacity-0",
        )}
      >
        {item.year}
      </div>

      {/* Card — mobile sits right of the rail, desktop alternates */}
      <div
        className={cn(
          "w-full pl-20 transition-all duration-700 ease-expo-out md:w-1/2 md:pl-0",
          isEven ? "md:ml-0 md:pr-16 md:text-right" : "md:ml-auto md:pl-16",
          inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        )}
      >
        <div className="card-lift group p-7">
          <div
            className={cn(
              "icon-blob mb-4 h-12 w-12",
              item.blob,
              isEven && "md:ml-auto",
            )}
          >
            <item.icon className="h-5 w-5" />
          </div>
          <h3 className="mb-2 font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
            {item.title}
          </h3>
          <p className="font-body text-sm leading-relaxed text-navy-500 dark:text-sand-400">
            {item.desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function Timeline() {
  return (
    <section className="curve-top-lg curve-bottom-lg relative overflow-hidden bg-sand-200 py-24 dark:bg-navy-900 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="clay" className="-left-24 top-24 h-80 w-80" />
        <Sprig className="right-[5%] top-32 hidden h-32 w-24 -rotate-12 text-sage-500/40 lg:block" />
      </div>

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Our Journey"
          title="Milestones along"
          accent="the way."
          lead="Thirty years, five turning points, and a lot of concrete in between."
          className="mb-16"
        />

        <div className="relative mx-auto max-w-3xl">
          {/* Vertical rail */}
          <div className="absolute bottom-0 left-6 top-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-champagne-500/45 to-transparent md:left-1/2" />

          <div className="space-y-14">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={item.year} item={item} isEven={i % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
