import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
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
      <main>
        <PageHero
          eyebrow="Our Portfolio"
          title="Homes that define"
          accent="a skyline."
          lead="From luxury high-rises to thoughtfully designed affordable homes — explore properties built to last generations."
        />

        <section className="relative bg-white pb-24 pt-16 dark:bg-navy-800 md:pb-32">
          <div className="container-max">
            <ProjectsGrid initialProjects={projects} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
