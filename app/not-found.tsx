import Link from 'next/link';
import { ArrowRight, Home } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center pt-20">
        <div className="text-center px-4">
          <p className="font-display text-8xl font-bold text-gradient-gold mb-4">404</p>
          <h1 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-3">
            Page Not Found
          </h1>
          <p className="font-body text-charcoal-500 dark:text-charcoal-300 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <Link href="/" className="btn-primary inline-flex">
            <Home className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
