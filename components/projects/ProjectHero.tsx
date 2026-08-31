import Image from "next/image";
import { MapPin, Building2, IndianRupee } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<Project["status"], string> = {
  Upcoming: "badge-blue",
  Ongoing: "badge-gold",
  Completed: "badge-green",
};

export function ProjectHero({ project }: { project: Project }) {
  return (
    /* The image is inset and rounded rather than full-bleed, so the
       page opens on paper and the elevation reads as a framed plate. */
    <section className="relative bg-sand-100 pb-8 pt-24 dark:bg-navy-900 md:pt-28">
      <div className="container-max">
        <div className="relative h-[58vh] min-h-[400px] overflow-hidden rounded-[32px] shadow-soft-lg md:h-[64vh] md:max-h-[620px] md:rounded-[40px]">
          <Image
            src={project.elevationImageUrl}
            alt={`${project.name} elevation`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/92 via-navy-900/35 to-navy-900/5" />

          <div className="absolute inset-x-0 bottom-0 p-7 md:p-12">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "backdrop-blur-sm",
                  STATUS_STYLES[project.status],
                )}
              >
                {project.status}
              </span>
              <span className="badge bg-white/15 text-white backdrop-blur-sm">
                {project.category}
              </span>
              {project.rera && (
                <span className="badge bg-white/15 font-mono text-white backdrop-blur-sm">
                  RERA: {project.rera}
                </span>
              )}
            </div>

            <h1 className="mb-2 text-balance font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
              {project.name}
            </h1>
            <p className="mb-6 max-w-2xl font-body text-base text-sand-200 md:text-lg">
              {project.tagline}
            </p>

            {/* Key facts as pills, legible over any elevation photo */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-sm text-white backdrop-blur-sm">
                <MapPin className="h-4 w-4 text-champagne-300" />
                {project.location}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-sm text-white backdrop-blur-sm">
                <IndianRupee className="h-4 w-4 text-champagne-300" />
                {project.priceRange}
              </span>
              {project.possessionDate && (
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 font-body text-sm text-white backdrop-blur-sm">
                  <Building2 className="h-4 w-4 text-champagne-300" />
                  Possession {project.possessionDate}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
