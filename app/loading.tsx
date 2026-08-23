export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-100 dark:bg-charcoal-900">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-sm bg-gold-gradient flex items-center justify-center animate-pulse">
          <span className="font-display text-charcoal-900 font-bold text-xl">S</span>
        </div>
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-gold-500">Loading</p>
      </div>
    </div>
  );
}
