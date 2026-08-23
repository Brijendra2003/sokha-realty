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
        <div className="w-14 h-14 rounded-sm bg-gold-gradient flex items-center justify-center animate-pulse">
          <span className="font-display text-charcoal-900 font-bold text-2xl">
            S
          </span>
        </div>
        <div
          className="w-8 h-8 rounded-full border-2 border-charcoal-200 border-t-gold-500 animate-spin"
          aria-hidden="true"
        />
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-charcoal-500">
          Loading
        </p>
      </div>
    </div>
  );
}
