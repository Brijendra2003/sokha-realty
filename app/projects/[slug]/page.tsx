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
      <main className="pt-20">

        {/* Full-width elevation hero */}
        <ProjectHero project={project} />

        {/* Breadcrumb */}
        <div className="container-max pt-6">
          <nav className="flex items-center gap-2 text-xs text-charcoal-400 font-body">
            <Link href="/" className="hover:text-gold-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/projects" className="hover:text-gold-500">Projects</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-charcoal-600 dark:text-charcoal-300">{project.name}</span>
          </nav>
        </div>

        {/* Two-column layout: left content scrolls, right form sticks */}
        <div className="container-max py-10">
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
                  <div id="gallery" className="scroll-mt-24">
                    <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {project.galleryImages.map((img, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={img}
                          alt={`${project.name} gallery ${i + 1}`}
                          className="rounded-lg w-full h-40 object-cover hover:opacity-90 transition-opacity cursor-pointer"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Disclaimer */}
                <div className="card p-5 bg-ivory-50 dark:bg-charcoal-800/50">
                  <p className="text-xs text-charcoal-400 leading-relaxed">
                    Disclaimer: This is not an official offer or contract of any sort. Information given here is purely
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
