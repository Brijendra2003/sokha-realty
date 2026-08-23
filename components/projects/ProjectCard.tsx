"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
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
    <Link
      href={`/projects/${project.slug}`}
      className="card group block overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-ivory-200 dark:bg-charcoal-700">
        <Image
          src={project.elevationImageUrl || "/images/placeholder.jpg"}
          alt={project.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Status */}
        <span
          className={cn("absolute left-3 top-3", STATUS_STYLES[project.status])}
        >
          {project.status}
        </span>

        {/* Category */}
        <span className="badge absolute right-3 top-3 bg-black/70 text-white backdrop-blur">
          {project.category}
        </span>

        {/* Compare */}
        <div
          className="absolute bottom-3 right-3 z-20"
          onClick={(e) => e.preventDefault()}
        >
          <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-white/90 px-3 py-2 text-xs font-medium shadow-lg backdrop-blur">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => toggleCompare(project.id)}
              className="h-4 w-4 rounded accent-yellow-500"
            />
            Compare
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display mb-2 text-xl font-semibold text-charcoal-800 transition-colors group-hover:text-gold-500 dark:text-white">
          {project.name}
        </h3>

        <p className="mb-3 line-clamp-2 text-sm text-charcoal-500 dark:text-charcoal-300">
          {project.tagline}
        </p>

        {/* Location */}
        <div className="mb-4 flex items-center gap-2 text-sm text-charcoal-500 dark:text-charcoal-400">
          <MapPin className="h-4 w-4 text-gold-500" />
          {project.location}
        </div>

        {/* Configurations */}
        <div className="mb-5 flex flex-wrap gap-2">
          {project.configurations.slice(0, 3).map((config) => (
            <span
              key={config.type}
              className="rounded-full bg-ivory-200 px-3 py-1 text-xs dark:bg-charcoal-700"
            >
              {config.type}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-ivory-300 pt-4 dark:border-charcoal-700">
          <div>
            <p className="text-xs uppercase tracking-wider text-charcoal-400">
              Starting From
            </p>

            <p className="font-display text-lg font-semibold text-gold-500">
              {project.priceRange}
            </p>
          </div>

          <span className="flex items-center gap-2 text-sm font-medium text-gold-500 transition-all group-hover:gap-3">
            View Details
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
