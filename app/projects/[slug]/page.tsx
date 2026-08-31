import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { ProjectHero } from '@/components/projects/ProjectHero';
import { ProjectSectionNav } from '@/components/projects/ProjectSectionNav';
import { ProjectHighlights } from '@/components/projects/ProjectHighlights';
import { ProjectAmenities } from '@/components/projects/ProjectAmenities';
import { ProjectConfigurations } from '@/components/projects/ProjectConfigurations';
import { ProjectFloorPlans } from '@/components/projects/ProjectFloorPlans';
import { ProjectConnectivity } from '@/components/projects/ProjectConnectivity';
import { ProjectLocationMap } from '@/components/projects/ProjectLocationMap';
import { getProjects, getProjectBySlug } from '@/lib/firestore';
import { getProjectMetadata, projectJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = await getProjects().catch(() => []);
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  if (!project) return { title: 'Project Not Found' };
  return getProjectMetadata(project);
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sokharealty.com';
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home',     url: siteUrl },
    { name: 'Projects', url: `${siteUrl}/projects` },
    { name: project.name, url: `${siteUrl}/projects/${project.slug}` },
  ]);

  return (
    <>
      {/* JSON-LD structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />

      <Navbar />
      <main className="bg-sand-100 dark:bg-navy-900">

        {/* Framed elevation hero */}
        <ProjectHero project={project} />

        {/* Breadcrumb */}
        <div className="container-max pt-6">
          <nav className="flex items-center gap-2 font-body text-xs text-navy-400 dark:text-sand-500">
            <Link href="/" className="transition-colors hover:text-champagne-700 dark:hover:text-champagne-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/projects" className="transition-colors hover:text-champagne-700 dark:hover:text-champagne-400">Projects</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-navy-600 dark:text-sand-300">{project.name}</span>
          </nav>
        </div>

        {/* Two-column layout: left content scrolls, right form sticks */}
        <div className="container-max py-12">
          <div className="project-layout">

            {/* ── LEFT: Content ── */}
            <div className="min-w-0">
              <ProjectSectionNav />

              <div className="space-y-14">
                <ProjectHighlights highlights={project.highlights} />
                <ProjectAmenities amenities={project.amenities} />
                <ProjectConfigurations configurations={project.configurations} />
                <ProjectFloorPlans floorPlans={project.floorPlans} />
                <ProjectConnectivity connectivity={project.connectivity} />
                <ProjectLocationMap
                  embedUrl={project.googleMapsEmbedUrl}
                  location={project.location}
                  projectName={project.name}
                />

                {/* Gallery */}
                {project.galleryImages?.length > 0 && (
                  <div id="gallery" className="scroll-anchor">
                    <span className="eyebrow-pill mb-4">Gallery</span>
                    <h2 className="heading-md mb-7 text-navy-800 dark:text-sand-100">
                      A closer look
                    </h2>
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {project.galleryImages.map((img, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={img}
                          alt={`${project.name} gallery ${i + 1}`}
                          className="h-40 w-full rounded-[20px] object-cover shadow-soft transition-all duration-400 ease-expo-out hover:-translate-y-1 hover:shadow-soft-lg"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="legal-callout">
                  <p className="text-xs leading-relaxed">
                    <strong>Disclaimer:</strong> This is not an official offer or contract of any sort. Information given here is purely
                    indicative and provided to give a roughly stated overview to interested parties for our products.
                    {project.rera && ` MahaRERA Registration No: ${project.rera}.`} The promoter has registered the
                    project under MahaRERA. Website: maharera.mahaonline.gov.in
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Sticky enquiry form ── */}
            <aside className="min-w-0">
              <EnquiryForm
                projectName={project.name}
                source="Project Page"
                title={`Enquire — ${project.name}`}
                subtitle="Site visit slots filling fast"
              />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
