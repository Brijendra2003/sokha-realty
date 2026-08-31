'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Maximize2, Download } from 'lucide-react';
import type { FloorPlan } from '@/types';
import { SubsectionHeading } from './SubsectionHeading';

export function ProjectFloorPlans({ floorPlans }: { floorPlans: FloorPlan[] }) {
  const [active, setActive] = useState<FloorPlan | null>(null);

  // Escape closes the lightbox — expected of any modal, and the only
  // way out for keyboard users who never reach the close button.
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  if (!floorPlans?.length) return null;

  return (
    <div id="floor-plans" className="scroll-anchor">
      <SubsectionHeading eyebrow="Plans" title="Floor plans" tone="clay" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {floorPlans.map(fp => (
          <button
            key={fp.type}
            onClick={() => setActive(fp)}
            className="card-lift group overflow-hidden p-3 text-left"
          >
            <div className="relative h-48 overflow-hidden rounded-[20px] bg-sand-200 dark:bg-navy-800">
              <Image
                src={fp.imageUrl}
                alt={`${fp.type} floor plan`}
                fill
                className="object-contain p-3"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-navy-900/0 transition-colors duration-300 group-hover:bg-navy-900/45">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-champagne-500 text-navy-900 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" />
                </span>
              </div>
            </div>

            <div className="px-4 pb-2 pt-4">
              <p className="font-display font-semibold text-navy-800 dark:text-sand-100">
                {fp.type}
              </p>
              <p className="mt-0.5 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                {fp.area}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.type} floor plan`}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy-900/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-3xl overflow-auto rounded-[28px] bg-white dark:bg-navy-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-sand-300 p-5 dark:border-navy-600">
              <div>
                <p className="font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
                  {active.type}
                </p>
                <p className="font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                  {active.area}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={active.imageUrl}
                  download
                  aria-label="Download floor plan"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-sand-100 hover:text-champagne-700 dark:text-sand-300 dark:hover:bg-navy-800"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close floor plan"
                  className="flex h-10 w-10 items-center justify-center rounded-full text-navy-500 transition-colors hover:bg-sand-100 hover:text-clay-600 dark:text-sand-300 dark:hover:bg-navy-800"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative h-[60vh] bg-sand-100 dark:bg-navy-900">
              <Image src={active.imageUrl} alt={active.type} fill className="object-contain p-6" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
