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
      <main className="pt-20">

        {/* Cover image */}
        <section className="relative w-full h-[40vh] min-h-[320px] max-h-[480px]">
          <Image
            src={blog.coverImageUrl}
            alt={blog.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-charcoal-900/30 to-charcoal-900/10" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="container-max pb-8">
              <span className="badge-gold w-fit mb-4">{blog.category}</span>
              <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-white max-w-3xl text-balance">
                {blog.title}
              </h1>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="container-max pt-6">
          <nav className="flex items-center gap-2 text-xs text-charcoal-400 font-body">
            <Link href="/" className="hover:text-gold-500">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/blogs" className="hover:text-gold-500">Blogs</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-charcoal-600 dark:text-charcoal-300 line-clamp-1">{blog.title}</span>
          </nav>
        </div>

        {/* Two-column layout */}
        <div className="container-max py-10">
          <div className="project-layout">

            {/* ── LEFT: Article content ── */}
            <div className="min-w-0">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-5 pb-6 mb-8 border-b border-ivory-200 dark:border-charcoal-600">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center text-charcoal-900 font-display font-semibold text-sm">
                    {blog.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-charcoal-800 dark:text-ivory-100">{blog.author}</p>
                    <p className="text-xs text-charcoal-400 font-mono">Author</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs text-charcoal-400 font-mono">
                  <Calendar className="w-3.5 h-3.5" /> {formatDate(blog.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-charcoal-400 font-mono">
                  <Clock className="w-3.5 h-3.5" /> {blog.readTime} min read
                </span>
              </div>

              {/* Article body (CMS-generated HTML) */}
              <div
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-ivory-200 dark:border-charcoal-600">
                  {blog.tags.map(tag => (
                    <span key={tag} className="badge bg-ivory-200 dark:bg-charcoal-700 text-charcoal-600 dark:text-charcoal-300">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share row */}
              <div className="flex items-center gap-3 mt-8">
                <span className="text-xs font-medium text-charcoal-500 dark:text-charcoal-300">Share:</span>
                {[
                  { icon: Facebook, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
                  { icon: Twitter,  href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(blog.title)}` },
                  { icon: Linkedin, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}` },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-ivory-300 dark:border-charcoal-600 text-charcoal-500 hover:border-gold-400 hover:text-gold-500 transition-colors"
                  >
                    <s.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
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
