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
    <div className="sticky top-20 z-30 bg-ivory-100/95 dark:bg-charcoal-900/95 backdrop-blur-sm border-b border-ivory-200 dark:border-charcoal-700 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8">
      <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar py-3">
        {SECTIONS.map(s => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              'flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium font-body whitespace-nowrap transition-all duration-200',
              active === s.id
                ? 'bg-gold-500 text-charcoal-900'
                : 'text-charcoal-500 dark:text-charcoal-300 hover:bg-ivory-200 dark:hover:bg-charcoal-700'
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
