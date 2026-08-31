import { MapPin, Navigation } from 'lucide-react';
import { SubsectionHeading } from './SubsectionHeading';

export function ProjectLocationMap({
  embedUrl,
  location,
  projectName,
}: {
  embedUrl: string;
  location: string;
  projectName: string;
}) {
  if (!embedUrl) return null;

  return (
    <div id="location" className="scroll-anchor">
      <SubsectionHeading eyebrow="Where It Is" title="Location" tone="clay" />

      <div className="overflow-hidden rounded-[28px] border border-sand-300 bg-white shadow-soft dark:border-navy-600 dark:bg-navy-700">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sand-300 px-6 py-5 dark:border-navy-600">
          <div className="flex items-center gap-3">
            <span className="icon-blob blob-clay h-9 w-9">
              <MapPin className="h-4 w-4" />
            </span>
            <span className="font-body text-sm text-navy-700 dark:text-sand-200">
              {location}
            </span>
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${projectName} ${location}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-champagne-500 px-5 py-2 font-body text-xs font-semibold text-champagne-700 transition-all duration-300 hover:bg-champagne-500 hover:text-navy-900 dark:text-champagne-400 dark:hover:text-navy-900"
          >
            <Navigation className="h-3.5 w-3.5" />
            Get Directions
          </a>
        </div>

        <div className="relative h-[380px] w-full bg-sand-100 dark:bg-navy-800">
          <iframe
            src={embedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${projectName} location map`}
          />
        </div>
      </div>
    </div>
  );
}
