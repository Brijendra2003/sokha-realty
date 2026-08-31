import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User, ChevronRight, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EnquiryForm } from '@/components/common/EnquiryForm';
import { getBlogs, getBlogBySlug } from '@/lib/firestore';
import { getBlogMetadata, blogJsonLd, breadcrumbJsonLd } from '@/lib/seo';
import { formatDate } from '@/lib/utils';

export const revalidate = 3600;

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const blogs = await getBlogs().catch(() => []);
  return blogs.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) return { title: 'Article Not Found' };
  return getBlogMetadata(blog);
}

export default async function BlogDetailPage({ params }: PageProps) {
  const blog = await getBlogBySlug(params.slug);
  if (!blog) notFound();

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sokharealty.com';
  const pageUrl = `${siteUrl}/blogs/${blog.slug}`;
  const breadcrumbs = breadcrumbJsonLd([
    { name: 'Home',  url: siteUrl },
    { name: 'Blogs', url: `${siteUrl}/blogs` },
    { name: blog.title, url: pageUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd(blog)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <Navbar />
      <main className="bg-sand-100 dark:bg-navy-900">

        {/* Cover image — framed on paper, matching the project hero */}
        <section className="relative pb-8 pt-24 md:pt-28">
          <div className="container-max">
            <div className="relative h-[42vh] min-h-[320px] max-h-[500px] overflow-hidden rounded-[32px] shadow-soft-lg md:rounded-[40px]">
              <Image
                src={blog.coverImageUrl}
                alt={blog.title}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/92 via-navy-900/30 to-navy-900/5" />
              <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
                <span className="badge-gold mb-4 w-fit backdrop-blur-sm">{blog.category}</span>
                <h1 className="max-w-3xl text-balance font-display text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                  {blog.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="container-max pt-4">
          <nav className="flex items-center gap-2 font-body text-xs text-navy-400 dark:text-sand-500">
            <Link href="/" className="transition-colors hover:text-champagne-700 dark:hover:text-champagne-400">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/blogs" className="transition-colors hover:text-champagne-700 dark:hover:text-champagne-400">Journal</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="line-clamp-1 text-navy-600 dark:text-sand-300">{blog.title}</span>
          </nav>
        </div>

        {/* Two-column layout */}
        <div className="container-max py-12">
          <div className="project-layout">

            {/* ── LEFT: Article content ── */}
            <div className="min-w-0">
              {/* The article sits on its own paper card, so long-form
                  reading has a clear measure and edge. */}
              <article className="card p-7 md:p-10">
                {/* Meta row */}
                <div className="mb-9 flex flex-wrap items-center gap-6 border-b border-sand-300 pb-7 dark:border-navy-600">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-blob bg-gold-gradient font-display text-sm font-semibold text-navy-900">
                      {blog.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-body text-sm font-semibold text-navy-800 dark:text-sand-100">{blog.author}</p>
                      <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400">Author</p>
                    </div>
                  </div>
                  <span className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                    <Calendar className="h-3.5 w-3.5 text-champagne-500" /> {formatDate(blog.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                    <Clock className="h-3.5 w-3.5 text-champagne-500" /> {blog.readTime} min read
                  </span>
                </div>

                {/* Article body (CMS-generated HTML) */}
                <div
                  className="prose-custom"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-sand-300 pt-7 dark:border-navy-600">
                    {blog.tags.map(tag => (
                      <span key={tag} className="badge bg-sand-200 text-navy-600 dark:bg-navy-800 dark:text-sand-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Share row */}
                <div className="mt-8 flex items-center gap-3">
                  <span className="font-mono text-2xs uppercase tracking-label text-navy-500 dark:text-sand-400">Share</span>
                  {[
                    { icon: Facebook, label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
                    { icon: Twitter,  label: 'X',        href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(blog.title)}` },
                    { icon: Linkedin, label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
                  ].map(s => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Share on ${s.label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-sand-300 text-navy-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-champagne-500 hover:bg-champagne-500 hover:text-navy-900 dark:border-navy-600 dark:text-sand-300"
                    >
                      <s.icon className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </div>
              </article>
            </div>

            {/* ── RIGHT: Sticky enquiry form ── */}
            <aside className="min-w-0">
              <EnquiryForm
                source="Blog Page"
                title="Looking for a Home?"
                subtitle="Talk to our property experts"
              />
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
