'use client';

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface PageLoaderContextValue {
  isLoading: boolean;
  /** Registers a loading lock. Call the returned cleanup (or `hideLoader`) once done. */
  showLoader: () => void;
  hideLoader: () => void;
}

const PageLoaderContext = createContext<PageLoaderContextValue | null>(null);

/**
 * App-wide loading coordinator.
 *
 * Multiple independent parts of the app (e.g. the hero frame sequence) can call
 * `showLoader()` / `hideLoader()`. A simple ref-counted lock is used so the
 * overlay only disappears once every caller that asked for it has finished —
 * this keeps unrelated pages (which never call showLoader) unaffected.
 */
export function PageLoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const lockCount = useRef(0);

  const showLoader = useCallback(() => {
    lockCount.current += 1;
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    lockCount.current = Math.max(0, lockCount.current - 1);
    if (lockCount.current === 0) setIsLoading(false);
  }, []);

  return (
    <PageLoaderContext.Provider value={{ isLoading, showLoader, hideLoader }}>
      {children}
    </PageLoaderContext.Provider>
  );
}

export function usePageLoader() {
  const ctx = useContext(PageLoaderContext);
  if (!ctx) {
    throw new Error('usePageLoader must be used within a PageLoaderProvider');
  }
  return ctx;
}
