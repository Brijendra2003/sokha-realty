interface SpinnerProps {
  label?: string;
  className?: string;
}

/**
 * Small inline loading indicator for scoped, local loading states
 * (e.g. a data table refreshing) — as opposed to GlobalLoadingOverlay,
 * which blocks the entire page.
 */
export function Spinner({ label, className = '' }: SpinnerProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 py-20 text-charcoal-400 ${className}`}
      role="status"
      aria-live="polite"
    >
      <div
        className="w-6 h-6 rounded-full border-2 border-charcoal-200 dark:border-charcoal-600 border-t-gold-500 animate-spin"
        aria-hidden="true"
      />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
