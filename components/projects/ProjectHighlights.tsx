import * as Icons from 'lucide-react';
import type { ProjectHighlight } from '@/types';
import { SubsectionHeading } from './SubsectionHeading';

// Map icon name strings (stored in Firestore) to Lucide components
const iconMap = Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>;

/* Tints cycle so a row of highlight tiles reads as a hand-set group
   rather than a uniform strip. */
const BLOBS = ['blob-champagne', 'blob-clay', 'blob-sage'];

export function ProjectHighlights({ highlights }: { highlights: ProjectHighlight[] }) {
  if (!highlights?.length) return null;

  return (
    <div id="highlights" className="scroll-anchor">
      <SubsectionHeading eyebrow="At a Glance" title="Project highlights" />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {highlights.map((h, i) => {
          const Icon = iconMap[h.icon] || Icons.Sparkles;
          return (
            <div key={h.label} className="card-lift group p-6 text-center">
              <div className={`icon-blob mx-auto mb-4 h-12 w-12 ${BLOBS[i % BLOBS.length]}`}>
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                {h.value}
              </p>
              <p className="mt-1 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                {h.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
