'use client';

import { useEffect } from 'react';
import { usePageLoader } from '@/contexts/PageLoaderContext';

/**
 * Sits at the root of the app. Renders a solid white, full-viewport overlay
 * whenever `isLoading` is true (see PageLoaderContext) — used while heavy
 * assets such as the hero frame sequence are preloading.
 *
 * It intentionally:
 *  - covers the ENTIRE screen (fixed inset-0, highest z-index)
 *  - captures every pointer/keyboard/scroll interaction so nothing behind
 *    it is clickable, scrollable, or focusable while it's up
 *  - stays solid white regardless of light/dark theme, per design request
 */
export function GlobalLoadingOverlay() {
  const { isLoading } = usePageLoader();

  useEffect(() => {
    if (isLoading) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
      role="alert"
      aria-busy="true"
      aria-live="assertive"
      aria-label="Loading, please wait"
      // Block every interaction with whatever is underneath.
      onClick={(e) => e.preventDefault()}
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
      onWheel={(e) => e.preventDefault()}
      onKeyDown={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
      tabIndex={-1}
    >
      <div className="flex flex-col items-center gap-5">
        {/* The wordmark blob, slowly reshaping — same motif as the
            route-level loader and the footer logo. */}
        <div className="flex h-16 w-16 animate-blob-morph items-center justify-center bg-gold-gradient shadow-gold">
          <span className="font-display text-2xl font-bold text-navy-900">
            S
          </span>
        </div>
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-sand-300 border-t-champagne-500"
          aria-hidden="true"
        />
        <p className="font-mono text-2xs uppercase tracking-label text-navy-500">
          Loading
        </p>
      </div>
    </div>
  );
}
