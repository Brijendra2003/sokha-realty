import { Check } from 'lucide-react';
import type { ProjectAmenity } from '@/types';
import { SubsectionHeading } from './SubsectionHeading';

export function ProjectAmenities({ amenities }: { amenities: ProjectAmenity[] }) {
  if (!amenities?.length) return null;

  return (
    <div id="amenities" className="scroll-anchor">
      <SubsectionHeading eyebrow="Life Here" title="Amenities & facilities" tone="clay" />

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {amenities.map(group => (
          <div key={group.category} className="card p-7">
            <h3 className="mb-5 font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
              {group.category}
            </h3>
            <ul className="space-y-3">
              {group.items.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-body text-sm text-navy-600 dark:text-sand-300"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sage-100 text-sage-700 dark:bg-sage-500/20 dark:text-sage-300">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
