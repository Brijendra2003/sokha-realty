"use client";

import { Target, Eye, Heart, Award } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, DotScatter } from "@/components/ui/Decor";
import { cn } from "@/lib/utils";

const VALUES = [
  {
    icon: Target,
    title: "Integrity",
    desc: "Transparent dealings, honest timelines and ethical practice in every single transaction.",
    blob: "blob-champagne",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "We don't build for today — we design spaces that still make sense a generation from now.",
    blob: "blob-clay",
  },
  {
    icon: Heart,
    title: "Customer-First",
    desc: "Every decision starts with one question: how does this actually serve the people living here?",
    blob: "blob-sage",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Uncompromising standards from the foundation right through to the final finish.",
    blob: "blob-champagne",
  },
];

export function ValuesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-navy-800 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="champagne" className="-right-28 top-8 h-96 w-96" />
        <Blob tone="sage" className="-left-24 bottom-8 h-80 w-80" />
        <DotScatter
          className="left-[4%] top-1/4 hidden text-clay-400 xl:grid"
          rows={4}
          cols={3}
        />
      </div>

      <div className="container-max relative z-10">
        <SectionHeading
          eyebrow="What Drives Us"
          title="Four things we"
          accent="never trade away."
          lead="They sound like poster words until a deadline slips or a cost runs over. That's when they actually count."
          className="mb-16"
        />

        <div
          ref={ref}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {VALUES.map((v, i) => (
            <div
              key={v.title}
              className={cn(
                "card-lift group cursor-default p-8 text-center",
                inView ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={cn("icon-blob mx-auto mb-6 h-16 w-16", v.blob)}>
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2.5 font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                {v.title}
              </h3>
              <p className="font-body text-sm leading-relaxed text-navy-500 dark:text-sand-400">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
