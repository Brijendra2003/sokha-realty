'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body className="bg-ivory-100 font-sans">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <p className="text-6xl font-bold text-gold-500 mb-4">Oops</p>
            <h1 className="text-2xl font-semibold text-charcoal-800 mb-3">Something went wrong</h1>
            <p className="text-charcoal-500 mb-8">
              We encountered an unexpected error. Please try again or return to the homepage.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 bg-gradient-to-br from-[#C9A84C] to-[#A8841C] text-charcoal-900 font-semibold px-6 py-3 rounded-sm"
              >
                <RefreshCcw className="w-4 h-4" /> Try Again
              </button>
              <Link href="/" className="inline-flex items-center gap-2 border border-gold-500 text-gold-600 font-semibold px-6 py-3 rounded-sm">
                <Home className="w-4 h-4" /> Home
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
