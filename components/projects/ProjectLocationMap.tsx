import { MapPin, Navigation } from 'lucide-react';

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
    <div id="location" className="scroll-mt-24">
      <h2 className="heading-md text-charcoal-800 dark:text-ivory-100 mb-6">Location</h2>
      <div className="card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-ivory-200 dark:border-charcoal-600">
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-gold-500" />
            <span className="font-body text-sm text-charcoal-700 dark:text-ivory-200">{location}</span>
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${projectName} ${location}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-medium text-gold-500 hover:text-gold-600"
          >
            <Navigation className="w-3.5 h-3.5" /> Get Directions
          </a>
        </div>
        <div className="relative w-full h-[380px] bg-ivory-100 dark:bg-charcoal-700">
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${projectName} location map`}
          />
        </div>
      </div>
    </div>
  );
}
