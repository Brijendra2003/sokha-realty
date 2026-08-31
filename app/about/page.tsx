import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CtaSection } from "@/components/home/CtaSection";
import { StatsSection } from "@/components/home/StatsSection";
import { AboutHero } from "@/components/about/AboutHero";
import { FounderNote } from "@/components/about/FounderNote";
import { Timeline } from "@/components/about/Timeline";
import { ValuesSection } from "@/components/about/ValuesSection";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sokha Realty's 30-year journey building landmark residential and commercial properties across Mumbai. Our story, values, and leadership.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <AboutHero />
        <StatsSection />
        <FounderNote />
        <Timeline />
        <ValuesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
