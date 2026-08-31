import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { OurStory } from "@/components/home/OurStory";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ProcessSection } from "@/components/home/ProcessSection";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestBlogs } from "@/components/home/LatestBlogs";
import { CtaSection } from "@/components/home/CtaSection";
import { getProjects, getBlogs } from "@/lib/firestore";
import Hero from "@/components/home/Hero";
import Hero2 from "@/components/home/Hero2";

export const revalidate = 3600; // ISR: refresh every hour

export const metadata: Metadata = {
  title: "Sokha Realty | Premium Real Estate Developer in Mumbai",
  description:
    "Sokha Realty – 30+ years of trusted real estate development in Mumbai. Explore premium residential and commercial projects in prime locations.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [projects, blogs] = await Promise.all([
    getProjects({ featured: true, limitTo: 6 }).catch((err) => {
      console.error("Projects Error:", err);
      return [];
    }),
    getBlogs({ featured: true, limitTo: 3 }).catch((err) => {
      console.error("Blogs Error:", err);
      return [];
    }),
  ]);

  return (
    <>
      <Navbar />
      <main>
        {/* <Hero /> */}
        <Hero2/>
        {/* <HeroSection /> */}
        {/* Narrative order: proof → portfolio → who we are → why us →
            how it works → what residents say → journal → book a visit. */}
        <StatsSection />
        <FeaturedProjects projects={projects} />
        <OurStory />
        <WhyChooseUs />
        <ProcessSection />
        <Testimonials />
        <LatestBlogs blogs={blogs} />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
