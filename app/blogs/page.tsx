import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHero } from '@/components/layout/PageHero';
import { Blob, Sprig } from '@/components/ui/Decor';
import { getBlogs } from '@/lib/firestore';
import { formatDate } from '@/lib/utils';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Real estate insights, home buying guides, and market trends from Sokha Realty — Mumbai\'s trusted real estate developer.',
  alternates: { canonical: '/blogs' },
};

export default async function BlogsPage() {
  const blogs = await getBlogs().catch(() => []);
  const [featured, ...rest] = blogs;

  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Our Journal"
          title="Insights for the"
          accent="modern homeowner."
          lead="Market trends, buying guides and stories from Mumbai's evolving real estate landscape."
        />

        <section className="relative overflow-hidden bg-white pb-24 pt-16 dark:bg-navy-800 md:pb-32">
          <div className="pointer-events-none absolute inset-0">
            <Blob tone="champagne" className="-right-28 top-32 h-80 w-80" />
            <Sprig className="left-[3%] bottom-32 hidden h-32 w-24 rotate-[170deg] text-sage-400/40 xl:block" />
          </div>

          <div className="container-max relative z-10">
            {blogs.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-sand-300 py-24 text-center font-body text-navy-400 dark:border-navy-600">
                Articles coming soon…
              </div>
            ) : (
              <>
                {/* Featured post — image left, story right */}
                {featured && (
                  <Link
                    href={`/blogs/${featured.slug}`}
                    className="card-lift group mb-14 flex flex-col overflow-hidden p-3 md:flex-row md:p-4"
                  >
                    <div className="relative h-64 w-full overflow-hidden rounded-[22px] bg-sand-200 dark:bg-navy-700 md:h-auto md:w-1/2">
                      <Image
                        src={featured.coverImageUrl || '/images/placeholder.jpg'}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                      <span className="badge-clay absolute left-4 top-4 backdrop-blur-sm">
                        Featured
                      </span>
                    </div>

                    <div className="flex flex-col justify-center p-6 md:w-1/2 md:p-10">
                      <span className="badge-gold mb-5 w-fit">{featured.category}</span>
                      <h2 className="heading-md mb-4 text-balance text-navy-800 transition-colors group-hover:text-champagne-700 dark:text-sand-100 dark:group-hover:text-champagne-400">
                        {featured.title}
                      </h2>
                      <p className="mb-6 line-clamp-3 font-body text-navy-500 dark:text-sand-400">
                        {featured.excerpt}
                      </p>
                      <div className="mb-6 flex items-center gap-5 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                        <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-champagne-500" /> {formatDate(featured.publishedAt)}</span>
                        <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-champagne-500" /> {featured.readTime} min read</span>
                      </div>
                      <span className="flex w-fit items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-champagne-700 transition-all group-hover:gap-3 dark:text-champagne-400">
                        Read Full Article <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                )}

                {/* Rest grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {rest.map(blog => (
                    <Link
                      key={blog.id}
                      href={`/blogs/${blog.slug}`}
                      className="card-lift group flex h-full flex-col overflow-hidden p-3"
                    >
                      <div className="relative h-52 overflow-hidden rounded-[20px] bg-sand-200 dark:bg-navy-700">
                        <Image
                          src={blog.coverImageUrl || '/images/placeholder.jpg'}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.07]"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className="badge-gold absolute left-4 top-4 backdrop-blur-sm">{blog.category}</span>
                      </div>

                      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
                        <div className="mb-3 flex items-center gap-4 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                          <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 text-champagne-500" /> {formatDate(blog.publishedAt)}</span>
                          <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-champagne-500" /> {blog.readTime} min</span>
                        </div>
                        <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold text-navy-800 transition-colors group-hover:text-champagne-700 dark:text-sand-100 dark:group-hover:text-champagne-400">
                          {blog.title}
                        </h3>
                        <p className="line-clamp-2 flex-1 font-body text-sm text-navy-500 dark:text-sand-400">
                          {blog.excerpt}
                        </p>
                        <span className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-champagne-700 transition-all group-hover:gap-3 dark:text-champagne-400">
                          Read Article <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
