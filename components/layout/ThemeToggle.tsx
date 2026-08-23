'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className={cn('w-9 h-9 rounded-full bg-ivory-200 dark:bg-charcoal-700 animate-pulse', className)} />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={cn(
        'relative w-9 h-9 flex items-center justify-center rounded-full',
        'bg-ivory-200 dark:bg-charcoal-700 hover:bg-gold-100 dark:hover:bg-charcoal-600',
        'text-charcoal-600 dark:text-ivory-200 hover:text-gold-600 dark:hover:text-gold-400',
        'border border-ivory-300 dark:border-charcoal-600',
        'transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gold-400',
        className
      )}
    >
      <span className="sr-only">{isDark ? 'Light mode' : 'Dark mode'}</span>
      {isDark ? (
        <Sun  className="w-4 h-4 transition-transform duration-300 rotate-0" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300" />
      )}
    </button>
  );
}
