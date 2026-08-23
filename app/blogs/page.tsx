import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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
      <main className="pt-20">
        <section className="relative py-20 bg-charcoal-900 overflow-hidden">
          <div className="absolute inset-0 bg-hero-pattern" />
          <div className="container-max relative z-10 text-center">
            <span className="section-label !text-gold-400">Our Journal</span>
            <h1 className="heading-xl text-white max-w-2xl mx-auto text-balance">
              Insights for the <em className="text-gradient-gold not-italic">Modern Homeowner</em>
            </h1>
            <p className="font-body text-charcoal-300 max-w-xl mx-auto mt-6">
              Market trends, buying guides, and stories from Mumbai's evolving real estate landscape.
            </p>
          </div>
        </section>

        <section className="section-py bg-ivory-100 dark:bg-charcoal-900">
          <div className="container-max">
            {blogs.length === 0 ? (
              <div className="text-center py-24 text-charcoal-400">Articles coming soon…</div>
            ) : (
              <>
                {/* Featured post */}
                {featured && (
                  <Link
                    href={`/blogs/${featured.slug}`}
                    className="card group flex flex-col md:flex-row overflow-hidden mb-12"
                  >
                    <div className="relative w-full md:w-1/2 h-64 md:h-auto bg-ivory-200 dark:bg-charcoal-700">
                      <Image
                        src={featured.coverImageUrl || '/images/placeholder.jpg'}
                        alt={featured.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                    <div className="p-6 md:p-10 flex flex-col justify-center md:w-1/2">
                      <span className="badge-gold w-fit mb-4">{featured.category}</span>
                      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-3 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                        {featured.title}
                      </h2>
                      <p className="font-body text-charcoal-500 dark:text-charcoal-300 mb-5 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-charcoal-400 font-mono mb-5">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(featured.publishedAt)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {featured.readTime} min read</span>
                      </div>
                      <span className="flex items-center gap-2 text-sm font-medium text-gold-500 group-hover:gap-3 transition-all w-fit">
                        Read Full Article <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )}

                {/* Rest grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rest.map(blog => (
                    <Link key={blog.id} href={`/blogs/${blog.slug}`} className="card group block overflow-hidden">
                      <div className="relative h-48 overflow-hidden bg-ivory-200 dark:bg-charcoal-700">
                        <Image
                          src={blog.coverImageUrl || '/images/placeholder.jpg'}
                          alt={blog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <span className="absolute top-3 left-3 badge-gold">{blog.category}</span>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-3 text-xs text-charcoal-400 mb-3 font-mono">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {formatDate(blog.publishedAt)}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {blog.readTime} min</span>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-2 line-clamp-2 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                          {blog.title}
                        </h3>
                        <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300 line-clamp-2">
                          {blog.excerpt}
                        </p>
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
