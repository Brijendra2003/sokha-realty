import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProjectsGrid } from '@/components/projects/ProjectsGrid';
import { getProjects } from '@/lib/firestore';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Our Projects',
  description:
    'Explore Sokha Realty\'s portfolio of premium residential and commercial projects across Mumbai — from luxury apartments to affordable homes.',
  alternates: { canonical: '/projects' },
};

export default async function ProjectsPage() {
  const projects = await getProjects().catch(() => []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-charcoal-900 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="container-max relative z-10 text-center">
            <span className="section-label !text-gold-400">Our Portfolio</span>
            <h1 className="heading-xl text-white max-w-2xl mx-auto text-balance">
              Projects That <em className="text-gradient-gold not-italic">Define Skylines</em>
            </h1>
            <p className="font-body text-charcoal-300 max-w-xl mx-auto mt-6">
              From luxury high-rises to thoughtfully designed affordable homes — explore properties built to last generations.
            </p>
          </div>
        </section>

        <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
          <div className="container-max">
            <ProjectsGrid initialProjects={projects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
