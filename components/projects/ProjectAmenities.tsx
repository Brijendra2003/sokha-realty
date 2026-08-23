import { CheckCircle2 } from 'lucide-react';
import type { ProjectAmenity } from '@/types';

export function ProjectAmenities({ amenities }: { amenities: ProjectAmenity[] }) {
  if (!amenities?.length) return null;

  return (
    <div id="amenities" className="scroll-mt-24">
      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Amenities &amp; Facilities</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {amenities.map(group => (
          <div key={group.category} className="card p-5">
            <h3 className="font-display text-base font-semibold text-gold-500 mb-4">
              {group.category}
            </h3>
            <ul className="space-y-2.5">
              {group.items.map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-charcoal-600 dark:text-charcoal-300">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
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
