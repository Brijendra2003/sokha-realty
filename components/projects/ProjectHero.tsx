import Image from "next/image";
import { MapPin, Building2 } from "lucide-react";
import type { Project } from "@/types";

const STATUS_STYLES: Record<Project["status"], string> = {
  Upcoming: "badge-blue",
  Ongoing: "badge-gold",
  Completed: "badge-green",
};

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="relative w-full h-[100vh] min-h-[420px] max-h-[640px] mt-[-80px]">
      <Image
        src={project.elevationImageUrl}
        alt={`${project.name} elevation`}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/95 via-charcoal-900/40 to-charcoal-900/10" />

      <div className="absolute inset-x-0 bottom-0">
        <div className="container-max pb-8 md:pb-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={STATUS_STYLES[project.status]}>
              {project.status}
            </span>
            <span className="badge bg-white/15 text-white backdrop-blur-sm">
              {project.category}
            </span>
            {project.rera && (
              <span className="badge bg-white/15 text-white backdrop-blur-sm font-mono">
                RERA: {project.rera}
              </span>
            )}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-2 text-balance">
            {project.name}
          </h1>
          <p className="font-body text-base md:text-lg text-ivory-200 mb-4 max-w-2xl">
            {project.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ivory-200">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-gold-400" /> {project.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-gold-400" />{" "}
              {project.priceRange}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
