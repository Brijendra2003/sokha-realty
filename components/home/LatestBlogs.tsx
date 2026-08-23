import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import type { Blog } from '@/types';
import { formatDate } from '@/lib/utils';

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link href={`/blogs/${blog.slug}`} className="card group block overflow-hidden">
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
        <div className="flex items-center gap-3 text-xs text-charcoal-400 dark:text-charcoal-400 mb-3 font-mono">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" /> {formatDate(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {blog.readTime} min read
          </span>
        </div>
        <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100 mb-2 line-clamp-2 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
          {blog.title}
        </h3>
        <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300 line-clamp-2 mb-4">
          {blog.excerpt}
        </p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-gold-500 group-hover:gap-2.5 transition-all">
          Read Article <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function LatestBlogs({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="section-py bg-white dark:bg-charcoal-800">
      <div className="container-max">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="section-label">Insights &amp; Updates</span>
            <h2 className="heading-lg text-charcoal-800 dark:text-ivory-100">From Our Journal</h2>
            <p className="font-body text-charcoal-500 dark:text-charcoal-300 mt-3 max-w-lg">
              Real estate trends, buying guides, and updates from Mumbai's property market.
            </p>
          </div>
          <Link href="/blogs" className="btn-secondary flex-shrink-0">
            All Articles <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-charcoal-400">Articles coming soon…</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map(b => <BlogCard key={b.id} blog={b} />)}
          </div>
        )}
      </div>
    </section>
  );
}
