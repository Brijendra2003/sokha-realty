"use client";

import { Shield, Gem, Clock, Headphones, Leaf, Award } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, DotScatter } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

/* Tints rotate champagne → clay → sage so the grid feels hand-arranged
   rather than machine-generated, exactly as the reference boards do. */
const FEATURES = [
  {
    icon: Shield,
    title: "Quality Assured",
    desc: "Stringent checks at every stage, with materials sourced only from certified vendors.",
    blob: "blob-champagne",
  },
  {
    icon: Gem,
    title: "Premium Design",
    desc: "Award-winning architects and interior designers shape spaces you'll want to stay in.",
    blob: "blob-clay",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "95% of our projects handed over on schedule. Your investment is in steady hands.",
    blob: "blob-sage",
  },
  {
    icon: Headphones,
    title: "Post-Sales Care",
    desc: "A dedicated relationship manager for every homeowner — long after the keys change hands.",
    blob: "blob-clay",
  },
  {
    icon: Leaf,
    title: "Sustainable Homes",
    desc: "IGBC-aligned green building practices, rainwater harvesting and solar provisions.",
    blob: "blob-sage",
  },
  {
    icon: Award,
    title: "Award-Winning",
    desc: "Twelve National Real Estate Awards for excellence in design and construction.",
    blob: "blob-champagne",
  },
];

export function WhyChooseUs() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-sand-100 py-24 dark:bg-navy-900 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="champagne" className="-right-32 top-0 h-96 w-96" />
        <Blob tone="sage" className="-left-28 bottom-0 h-80 w-80" />
        <DotScatter
          className="left-[3%] top-1/3 hidden text-clay-400 xl:grid"
          rows={4}
          cols={4}
        />
      </div>

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="Why Sokha"
          title="Built on trust,"
          accent="finished with care."
          lead="We don't just build homes — we build the relationships and communities that outlast them."
          className="mb-16"
        />

        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((feat, i) => (
            <div
              key={feat.title}
              className={cn(
                "card-lift group cursor-default p-8",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className={cn("icon-blob mb-6", feat.blob)}>
                <feat.icon className="h-6 w-6" />
              </div>

              <h3 className="mb-2.5 font-display text-xl font-semibold text-navy-800 dark:text-sand-100">
                {feat.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-navy-500 dark:text-sand-400">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
