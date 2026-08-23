'use client';

import { useState } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import type { ConnectivityPoint } from '@/types';
import { cn } from '@/lib/utils';

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
    <div id="connectivity" className="scroll-mt-24">
      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Connectivity</h2>
      <div className="card divide-y divide-ivory-200 dark:divide-charcoal-600 overflow-hidden">
        {groups.map((group, idx) => (
          <div key={group.label}>
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-ivory-50 dark:hover:bg-charcoal-800/50 transition-colors"
            >
              <span className="flex items-center gap-2.5 font-display font-semibold text-charcoal-800 dark:text-ivory-100">
                <MapPin className="w-4 h-4 text-gold-500" />
                {group.label}
                <span className="font-mono text-2xs text-charcoal-400 font-normal">({group.points.length})</span>
              </span>
              <ChevronDown
                className={cn(
                  'w-4 h-4 text-charcoal-400 transition-transform duration-300',
                  openIdx === idx && 'rotate-180 text-gold-500'
                )}
              />
            </button>
            <div
              className={cn(
                'overflow-hidden transition-all duration-300 ease-expo-out',
                openIdx === idx ? 'max-h-96' : 'max-h-0'
              )}
            >
              <ul className="px-5 pb-4 space-y-2.5">
                {group.points.map(p => (
                  <li key={p.name} className="flex items-center justify-between text-sm">
                    <span className="text-charcoal-600 dark:text-charcoal-300">{p.name}</span>
                    <span className="font-mono text-xs text-gold-500 font-medium">{p.distance}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
