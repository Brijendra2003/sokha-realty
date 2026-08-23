'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Download } from 'lucide-react';
import type { FloorPlan } from '@/types';

export function ProjectFloorPlans({ floorPlans }: { floorPlans: FloorPlan[] }) {
  const [active, setActive] = useState<FloorPlan | null>(null);

  if (!floorPlans?.length) return null;

  return (
    <div id="floor-plans" className="scroll-mt-24">
      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Floor Plans</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {floorPlans.map(fp => (
          <button
            key={fp.type}
            onClick={() => setActive(fp)}
            className="card group relative overflow-hidden text-left"
          >
            <div className="relative h-48 bg-ivory-200 dark:bg-charcoal-700">
              <Image
                src={fp.imageUrl}
                alt={`${fp.type} floor plan`}
                fill
                className="object-contain p-3"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/40 transition-colors duration-300 flex items-center justify-center">
                <Maximize2 className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            <div className="p-4 border-t border-ivory-200 dark:border-charcoal-600">
              <p className="font-display font-semibold text-charcoal-800 dark:text-ivory-100">{fp.type}</p>
              <p className="font-mono text-xs text-charcoal-400 mt-0.5">{fp.area}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[60] bg-charcoal-900/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="bg-white dark:bg-charcoal-800 rounded-lg max-w-3xl w-full max-h-[85vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-ivory-200 dark:border-charcoal-600">
              <div>
                <p className="font-display font-semibold text-charcoal-800 dark:text-ivory-100">{active.type}</p>
                <p className="font-mono text-xs text-charcoal-400">{active.area}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={active.imageUrl}
                  download
                  className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-ivory-100 dark:hover:bg-charcoal-700 text-charcoal-500"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setActive(null)}
                  className="w-9 h-9 flex items-center justify-center rounded-sm hover:bg-ivory-100 dark:hover:bg-charcoal-700 text-charcoal-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="relative h-[60vh] bg-ivory-50 dark:bg-charcoal-900">
              <Image src={active.imageUrl} alt={active.type} fill className="object-contain p-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
