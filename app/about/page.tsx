import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { Target, Eye, Heart, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sokha Realty's 30-year journey building landmark residential and commercial properties across Mumbai. Our story, values, and leadership.",
  alternates: { canonical: "/about" },
};

const TIMELINE = [
  {
    year: "1995",
    title: "The Foundation",
    desc: "Sokha Realty founded with a single residential project in Andheri.",
  },
  {
    year: "2003",
    title: "First Landmark",
    desc: "Delivered our first high-rise — Sokha Towers, redefining Mumbai's western suburbs skyline.",
  },
  {
    year: "2011",
    title: "Commercial Expansion",
    desc: "Entered commercial real estate with Sokha Business Park in BKC.",
  },
  {
    year: "2018",
    title: "Green Building Certification",
    desc: "Became one of the first developers in the region with IGBC Gold-certified projects.",
  },
  {
    year: "2024",
    title: "5,000+ Families",
    desc: "Crossed the milestone of housing over 5,000 families across 42+ projects.",
  },
];

const VALUES = [
  {
    icon: Target,
    title: "Integrity",
    desc: "Transparent dealings, honest timelines, and ethical business practices in every transaction.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "We don't just build for today — we design spaces that remain relevant for generations.",
  },
  {
    icon: Heart,
    title: "Customer-First",
    desc: "Every decision starts with one question: how does this serve our homeowners?",
  },
  {
    icon: Award,
    title: "Excellence",
    desc: "Uncompromising quality standards from foundation to final finish.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/Cta_Bg_Img.jpeg')" }}
          />
          <div className="absolute inset-0 bg-black/70" />
          <div className="container-max relative z-10 text-center">
                        <span className="section-label !text-gold-400">Our Story</span>
                                    <h1 className="heading-xl text-white max-w-2xl mx-auto text-balance">
                                                  Three Decades of{" "}
                                                                <em className="text-gradient-gold not-italic">Building Trust</em>
                                                                            </h1>
                                                                                        <p className="font-body text-charcoal-300 max-w-xl mx-auto mt-6">
                                                                                                      From a single project in 1995 to a name synonymous with quality
                                                                                                                    across Mumbai — this is the Sokha Realty journey.
                                                                                                                                </p>
                                                                                                                                          </div>
                                                                                                                                                  </section>

        {/* Founder's Note */}
        <section className="section-py bg-white dark:bg-charcoal-800">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[420px] rounded-lg overflow-hidden bg-ivory-200 dark:bg-charcoal-700">
                <Image
                  src="/images/Dumy_Image_1.png"
                  alt="Founder of Sokha Realty"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <span className="section-label">Founder's Message</span>
                <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-5">
                  "We Build Homes, Not Just Buildings"
                </h2>
                <p className="font-body text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-4">
                  When I laid the foundation for our first project in 1995, I
                  made a promise to myself: every home we build would be one I'd
                  be proud to live in myself. That principle has guided Sokha
                  Builders for three decades.
                </p>
                <p className="font-body text-charcoal-600 dark:text-charcoal-300 leading-relaxed mb-6">
                  Today, as we look at the skyline we've helped shape across
                  Mumbai, I'm reminded that real estate isn't just about
                  construction — it's about the families who'll call these
                  spaces home for generations to come.
                </p>
                <div>
                  <p className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100">
                    Mr. Suresh Sokha
                  </p>
                  <p className="font-mono text-xs text-gold-500">
                    Founder &amp; Managing Director
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
          <div className="container-max">
            <div className="text-center mb-16">
              <span className="section-label">Our Journey</span>
              <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
                Milestones Along the Way
              </h2>
            </div>

            <div className="relative max-w-3xl mx-auto">
              {/* Vertical line */}
              <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-ivory-300 dark:bg-charcoal-600" />

              <div className="space-y-12">
                {TIMELINE.map((item, i) => {
                  const isEven = i % 2 === 0;
                  return (
                    <div key={item.year} className="relative flex items-center">
                      {/* Gold dot */}
                      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold-500 ring-4 ring-ivory-100 dark:ring-charcoal-900 z-10" />

                      {/* Card — mobile: always right of dot | desktop: alternates */}
                      <div
                        className={`w-full pl-14 md:pl-0 md:w-1/2 ${
                          isEven
                            ? "md:pr-12 md:text-right md:ml-0"
                            : "md:pl-14 md:ml-auto"
                        }`}
                      >
                        <div className="card p-5">
                          <p className="font-mono text-xs font-bold text-gold-500 mb-1">
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
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="section-py bg-white dark:bg-charcoal-800">
          <div className="container-max">
            <div className="text-center mb-14">
              <span className="section-label">What Drives Us</span>
              <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">
                Our Core Values
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {VALUES.map((v) => (
                <div key={v.title} className="card p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-sm bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center mb-4">
                    <v.icon className="w-5 h-5 text-gold-500" />
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

        <CtaSection />
      </main>
      <Footer />
    </>
  );
}

function TimelineCard({ item }: { item: (typeof TIMELINE)[number] }) {
  return (
    <div className="card p-5 inline-block max-w-sm">
      <p className="font-mono text-xs font-bold text-gold-500 mb-1">
        {item.year}
      </p>
      <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-1">
        {item.title}
      </h3>
      <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300">
        {item.desc}
      </p>
    </div>
  );
}
