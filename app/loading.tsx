export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-sand-100 dark:bg-navy-900">
      <div className="flex flex-col items-center gap-5">
        {/* The wordmark blob, breathing — same shape as the footer logo */}
        <div className="flex h-14 w-14 animate-blob-morph items-center justify-center bg-gold-gradient shadow-gold">
          <span className="font-display text-xl font-bold text-navy-900">S</span>
        </div>
        <p className="font-mono text-2xs uppercase tracking-label text-champagne-700 dark:text-champagne-400">
          Loading
        </p>
      </div>
    </div>
  );
}
