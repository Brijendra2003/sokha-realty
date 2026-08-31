'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import type { ConnectivityPoint } from '@/types';
import { cn } from '@/lib/utils';
import { SubsectionHeading } from './SubsectionHeading';

interface ConnectivityGroup {
  label: string;
  points: ConnectivityPoint[];
}

function groupConnectivity(points: ConnectivityPoint[]): ConnectivityGroup[] {
  // Group by a simple heuristic on the name; in production this would come pre-grouped from CMS
  const categories: Record<string, ConnectivityPoint[]> = {};
  points.forEach(p => {
    const key = p.direction || 'Nearby';
    if (!categories[key]) categories[key] = [];
    categories[key].push(p);
  });
  return Object.entries(categories).map(([label, points]) => ({ label, points }));
}

export function ProjectConnectivity({ connectivity }: { connectivity: ConnectivityPoint[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!connectivity?.length) return null;
  const groups = groupConnectivity(connectivity);

  return (
    <div id="connectivity" className="scroll-anchor">
      <SubsectionHeading eyebrow="Getting Around" title="Connectivity" />

      <div className="divide-y divide-sand-300 overflow-hidden rounded-[28px] border border-sand-300 bg-white shadow-soft dark:divide-navy-600 dark:border-navy-600 dark:bg-navy-700">
        {groups.map((group, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={group.label}>
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-champagne-50 dark:hover:bg-navy-800/60"
              >
                <span className="flex items-center gap-3 font-display font-semibold text-navy-800 dark:text-sand-100">
                  <span className="icon-blob blob-champagne h-9 w-9">
                    <MapPin className="h-4 w-4" />
                  </span>
                  {group.label}
                  <span className="font-mono text-2xs font-normal text-navy-400 dark:text-sand-500">
                    ({group.points.length})
                  </span>
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-navy-400 transition-transform duration-300',
                    isOpen && 'rotate-180 text-champagne-600',
                  )}
                />
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-400 ease-expo-out',
                  isOpen ? 'max-h-96' : 'max-h-0',
                )}
              >
                <ul className="space-y-3 px-6 pb-5">
                  {group.points.map(p => (
                    <li
                      key={p.name}
                      className="flex items-center justify-between gap-4 border-b border-dashed border-sand-300 pb-2 text-sm last:border-0 last:pb-0 dark:border-navy-600"
                    >
                      <span className="font-body text-navy-600 dark:text-sand-300">{p.name}</span>
                      <span className="badge-gold shrink-0">{p.distance}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
