import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Blob, Sprig, Sparkle } from '@/components/ui/Decor';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative flex min-h-[78vh] items-center justify-center overflow-hidden bg-sand-100 px-4 pt-28 dark:bg-navy-900">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-warm-wash opacity-70 dark:opacity-20" />
          <Blob tone="clay" className="-left-24 top-10 h-96 w-96" />
          <Blob tone="champagne" className="-right-20 bottom-10 h-80 w-80" />
          <Sprig className="left-[8%] bottom-16 hidden h-32 w-24 rotate-12 text-sage-400/60 lg:block" />
          <Sprig className="right-[9%] top-24 hidden h-28 w-20 rotate-[200deg] text-clay-400/50 lg:block" />
        </div>

        <div className="relative z-10 pb-24 text-center">
          <span className="eyebrow-pill mb-6">
            <Sparkle className="h-2.5 w-2.5" />
            Error 404
          </span>

          <p className="mb-4 font-display text-7xl font-semibold text-gradient-gold sm:text-8xl">
            404
          </p>

          <h1 className="heading-md mb-4 text-balance text-navy-800 dark:text-sand-100">
            This address doesn&apos;t exist{' '}
            <em className="script-accent script-accent-clay">just yet.</em>
          </h1>

          <p className="mx-auto mb-10 max-w-md text-pretty font-body text-navy-500 dark:text-sand-400">
            The page you&apos;re looking for may have moved, or the link that
            brought you here has gone stale.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/" className="btn-primary group">
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <Link href="/projects" className="btn-secondary group">
              Browse Projects
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
