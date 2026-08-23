import type { Metadata } from 'next';
import { MapPin, Briefcase, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
  'Competitive compensation & performance bonuses',
  'Health insurance for you and your family',
  'Continuous learning & professional development',
  'Collaborative, growth-focused work culture',
];

export default async function CareerPage() {
  const jobs = await getJobPostings().catch(() => []);

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-charcoal-900 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="container-max relative z-10 text-center">
            <span className="section-label !text-gold-400">Join Our Team</span>
            <h1 className="heading-xl text-white max-w-2xl mx-auto text-balance">
              Build Your Career, <em className="text-gradient-gold not-italic">Build the Skyline</em>
            </h1>
            <p className="font-body text-charcoal-300 max-w-xl mx-auto mt-6">
              We're always looking for passionate people who share our commitment to quality and excellence.
            </p>
          </div>
        </section>

        {/* Perks strip */}
        <section className="bg-white dark:bg-charcoal-800 border-b border-ivory-200 dark:border-charcoal-700">
          <div className="container-max py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {PERKS.map(perk => (
                <div key={perk} className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-charcoal-600 dark:text-charcoal-300">{perk}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
          <div className="container-max">
            <div className="mb-10">
              <span className="section-label">Open Positions</span>
              <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">Current Openings</h2>
            </div>

            {jobs.length === 0 ? (
              <div className="card p-10 text-center mb-16">
                <p className="text-charcoal-400 font-body">
                  No open positions right now — but we'd still love to hear from you. Submit your resume below!
                </p>
              </div>
            ) : (
              <div className="space-y-4 mb-16">
                {jobs.map(job => (
                  <div key={job.id} className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-2">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-charcoal-400 font-mono">
                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {job.department}</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.type}</span>
                        <span className="text-gold-500">{job.experience} experience</span>
                      </div>
                    </div>
                    <a href="#apply" className="btn-secondary flex-shrink-0">
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                ))}
              </div>
            )}

            {/* Application form */}
            <div id="apply" className="scroll-mt-24 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="section-label">Apply Now</span>
                <h2 className="heading-md text-charcoal-800 dark:text-ivory-100">Submit Your Application</h2>
              </div>
              <CareerForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
