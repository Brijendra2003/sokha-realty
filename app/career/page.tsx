import type { Metadata } from 'next';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Blob, Sprig, Sparkle } from '@/components/ui/Decor';
import { CareerForm } from '@/components/common/CareerForm';
import { getJobPostings } from '@/lib/firestore';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Sokha Realty. Explore open positions in construction, sales, design, and corporate roles at Mumbai\'s trusted real estate developer.',
  alternates: { canonical: '/career' },
};

const PERKS = [
  { title: 'Real ownership',   desc: 'Competitive compensation and performance bonuses tied to what you actually ship.', blob: 'blob-champagne' },
  { title: 'Family cover',     desc: 'Health insurance for you and the people you go home to.',                          blob: 'blob-clay'      },
  { title: 'Room to grow',     desc: 'Continuous learning budgets and genuine professional development.',                blob: 'blob-sage'      },
  { title: 'A team that asks', desc: 'A collaborative culture where the junior engineer gets to disagree.',              blob: 'blob-champagne' },
];

export default async function CareerPage() {
  const jobs = await getJobPostings().catch(() => []);

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Join Our Team"
          title="Build your career,"
          accent="build the skyline."
          lead="We're always looking for people who care about the details long after anyone else has stopped checking."
          tone="clay"
        >
          <a href="#openings" className="btn-primary">See Open Roles</a>
          <a href="#apply" className="btn-secondary">Send Your Resume</a>
        </PageHero>

        {/* Perks */}
        <section className="relative overflow-hidden bg-white py-20 dark:bg-navy-800 md:py-24">
          <div className="pointer-events-none absolute inset-0">
            <Blob tone="sage" className="-left-24 top-8 h-80 w-80" />
          </div>

          <div className="container-max relative z-10">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PERKS.map(perk => (
                <div key={perk.title} className="card-lift group p-7">
                  <div className={`icon-blob mb-5 h-12 w-12 ${perk.blob}`}>
                    <Sparkle className="h-4 w-4" />
                  </div>
                  <h3 className="mb-2 font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                    {perk.title}
                  </h3>
                  <p className="font-body text-sm leading-relaxed text-navy-500 dark:text-sand-400">
                    {perk.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section
          id="openings"
          className="curve-top-lg relative scroll-anchor overflow-hidden bg-sand-200 py-24 dark:bg-navy-900 md:py-32"
        >
          <div className="pointer-events-none absolute inset-0">
            <Blob tone="champagne" className="-right-28 top-24 h-96 w-96" />
            <Sprig className="left-[4%] top-40 hidden h-32 w-24 rotate-12 text-sage-500/40 lg:block" />
          </div>

          <div className="container-max relative z-10">
            <SectionHeading
              eyebrow="Open Positions"
              title="Roles we're"
              accent="hiring for."
              lead="Every role here is open because the work exists — not to fill a headcount target."
              className="mb-14"
            />

            {jobs.length === 0 ? (
              <div className="card mx-auto mb-16 max-w-2xl p-10 text-center">
                <p className="font-body text-navy-500 dark:text-sand-400">
                  No open positions right now — but we&apos;d still love to hear from you.
                  Send us your resume below and we&apos;ll reach out when something fits.
                </p>
              </div>
            ) : (
              <div className="mx-auto mb-16 max-w-4xl space-y-4">
                {jobs.map(job => (
                  <div
                    key={job.id}
                    className="card-lift flex flex-col justify-between gap-5 p-7 sm:flex-row sm:items-center"
                  >
                    <div>
                      <h3 className="mb-3 font-display text-xl font-semibold text-navy-800 dark:text-sand-100">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-2xs uppercase tracking-wider text-navy-500 dark:text-sand-400">
                        <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5 text-champagne-500" /> {job.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-champagne-500" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-champagne-500" /> {job.type}</span>
                        <span className="badge-clay">{job.experience}</span>
                      </div>
                    </div>
                    <a href="#apply" className="btn-secondary group shrink-0">
                      Apply Now
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Application form */}
            <div id="apply" className="mx-auto max-w-2xl scroll-anchor">
              <SectionHeading
                eyebrow="Apply Now"
                title="Tell us about"
                accent="yourself."
                lead="No cover letter theatre required — the resume and a few honest lines are plenty."
                tone="clay"
                className="mb-10"
              />
              <CareerForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
