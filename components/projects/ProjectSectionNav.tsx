'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'highlights',     label: 'Highlights'     },
  { id: 'amenities',      label: 'Amenities'      },
  { id: 'configurations', label: 'Configurations' },
  { id: 'floor-plans',    label: 'Floor Plans'    },
  { id: 'connectivity',   label: 'Connectivity'   },
  { id: 'location',       label: 'Location'       },
];

export function ProjectSectionNav() {
  const [active, setActive] = useState('highlights');

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    /* A floating pill rail rather than a bordered strip — it reads as a
       control, and matches the filter chips over on the listing page. */
    <div className="sticky top-24 z-30 mb-10">
      <nav className="no-scrollbar flex items-center gap-1.5 overflow-x-auto rounded-full border border-sand-300 bg-white/90 p-1.5 shadow-soft backdrop-blur-md dark:border-navy-600 dark:bg-navy-700/90">
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={active === s.id ? 'true' : undefined}
            className={cn(
              'shrink-0 whitespace-nowrap rounded-full px-4 py-2 font-body text-xs font-medium transition-all duration-300',
              active === s.id
                ? 'bg-champagne-500 text-navy-900 shadow-gold-sm'
                : 'text-navy-500 hover:bg-sand-100 hover:text-champagne-700 dark:text-sand-300 dark:hover:bg-navy-800',
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
