import * as Icons from 'lucide-react';
import type { ProjectHighlight } from '@/types';

// Map icon name strings (stored in Firestore) to Lucide components
const iconMap = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;

export function ProjectHighlights({ highlights }: { highlights: ProjectHighlight[] }) {
  if (!highlights?.length) return null;

  return (
    <div id="highlights" className="scroll-mt-24">
      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Project Highlights</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {highlights.map(h => {
          const Icon = iconMap[h.icon] || Icons.Sparkles;
          return (
            <div key={h.label} className="card p-4 text-center">
              <div className="w-10 h-10 mx-auto rounded-sm bg-gold-100 dark:bg-gold-900/20 flex items-center justify-center mb-3">
                <Icon className="w-4 h-4 text-gold-500" />
              </div>
              <p className="font-display text-base font-semibold text-charcoal-800 dark:text-ivory-100">
                {h.value}
              </p>
              <p className="font-mono text-2xs tracking-wide uppercase text-charcoal-400 mt-0.5">
                {h.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
