import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import type { Blog } from "@/types";
import { formatDate } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Blob, Sprig } from "@/components/ui/Decor";

function BlogCard({ blog }: { blog: Blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="card-lift group flex h-full flex-col overflow-hidden p-3"
    >
      <div className="relative h-52 overflow-hidden rounded-[20px] bg-sand-200 dark:bg-navy-700">
        <Image
          src={blog.coverImageUrl || "/images/placeholder.jpg"}
          alt={blog.title}
          fill
          className="object-cover transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.07]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="badge-gold absolute left-4 top-4 backdrop-blur-sm">
          {blog.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-4 pt-5">
        <div className="mb-3 flex items-center gap-4 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-3 w-3 text-champagne-500" />
            {formatDate(blog.publishedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-champagne-500" />
            {blog.readTime} min
          </span>
        </div>

        <h3 className="mb-2 line-clamp-2 font-display text-lg font-semibold text-navy-800 transition-colors group-hover:text-champagne-700 dark:text-sand-100 dark:group-hover:text-champagne-400">
          {blog.title}
        </h3>

        <p className="mb-5 line-clamp-2 flex-1 font-body text-sm text-navy-500 dark:text-sand-400">
          {blog.excerpt}
        </p>

        <span className="inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-wider text-champagne-700 transition-all group-hover:gap-3 dark:text-champagne-400">
          Read Article
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}

export function LatestBlogs({ blogs }: { blogs: Blog[] }) {
  return (
    <section className="relative overflow-hidden bg-white py-24 dark:bg-navy-900 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <Blob tone="champagne" className="-right-28 top-10 h-80 w-80" />
        <Sprig className="left-[4%] top-1/2 hidden h-28 w-20 rotate-[165deg] text-sage-400/45 xl:block" />
      </div>

      <div className="container-max relative z-10">
        <div className="mb-14 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Journal"
            title="Notes from the"
            accent="Mumbai market."
            lead="Buying guides, neighbourhood deep-dives and what the numbers are actually doing."
            align="left"
            className="mb-0"
          />
          <Link
            href="/blogs"
            className="btn-secondary group shrink-0 self-start md:self-auto"
          >
            All Articles
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {blogs.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-sand-300 py-20 text-center font-body text-navy-400 dark:border-navy-600">
            Articles coming soon…
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
