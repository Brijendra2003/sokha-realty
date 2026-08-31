"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Scale, Check } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  compare: string[];
  toggleCompare: (id: string) => void;
}

const STATUS_STYLES: Record<Project["status"], string> = {
  Upcoming: "badge-blue",
  Ongoing: "badge-gold",
  Completed: "badge-green",
};

export function ProjectCard({
  project,
  compare,
  toggleCompare,
}: ProjectCardProps) {
  const isSelected = compare.includes(project.id);

  return (
    <div className="card-lift group relative flex h-full flex-col p-3">
      {/* Compare toggle sits outside the Link so it never navigates */}
      <button
        onClick={() => toggleCompare(project.id)}
        aria-pressed={isSelected}
        aria-label={
          isSelected
            ? `Remove ${project.name} from comparison`
            : `Add ${project.name} to comparison`
        }
        className={cn(
          "absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-300",
          isSelected
            ? "bg-champagne-500 text-navy-900"
            : "bg-navy-900/70 text-sand-100 hover:bg-navy-900/90",
        )}
      >
        {isSelected ? (
          <Check className="h-3.5 w-3.5" />
        ) : (
          <Scale className="h-3.5 w-3.5" />
        )}
        {isSelected ? "Added" : "Compare"}
      </button>

      <Link
        href={`/projects/${project.slug}`}
        className="flex flex-1 flex-col"
      >
        {/* Image */}
        <div className="relative h-60 overflow-hidden rounded-[20px] bg-sand-200 dark:bg-navy-700">
          <Image
            src={project.elevationImageUrl || "/images/placeholder.jpg"}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.07]"
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/55 via-transparent to-transparent" />

          <span
            className={cn(
              "absolute left-4 top-4 backdrop-blur-sm",
              STATUS_STYLES[project.status],
            )}
          >
            {project.status}
          </span>

          <span className="badge absolute bottom-4 left-4 bg-navy-900/70 text-sand-100 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-4 pb-3 pt-5">
          <h3 className="mb-2 font-display text-xl font-semibold text-navy-800 transition-colors group-hover:text-champagne-700 dark:text-sand-100 dark:group-hover:text-champagne-400">
            {project.name}
          </h3>

          <p className="mb-3 line-clamp-2 font-body text-sm text-navy-500 dark:text-sand-400">
            {project.tagline}
          </p>

          <div className="mb-4 flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-navy-500 dark:text-sand-400">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-champagne-500" />
            <span className="truncate">{project.location}</span>
          </div>

          {/* Configurations */}
          <div className="mb-5 flex flex-wrap gap-2">
            {project.configurations.slice(0, 3).map((config) => (
              <span
                key={config.type}
                className="rounded-full bg-sand-200 px-3 py-1 font-body text-xs text-navy-600 dark:bg-navy-800 dark:text-sand-300"
              >
                {config.type}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between border-t border-sand-300 pt-5 dark:border-navy-600">
            <div>
              <p className="mb-0.5 font-mono text-2xs uppercase tracking-wider text-navy-400 dark:text-sand-500">
                Starting from
              </p>
              <p className="font-display text-lg font-semibold text-champagne-700 dark:text-champagne-400">
                {project.priceRange}
              </p>
            </div>

            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-champagne-100 text-champagne-700 transition-all duration-300 group-hover:bg-champagne-500 group-hover:text-navy-900 dark:bg-champagne-500/20 dark:text-champagne-300">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
