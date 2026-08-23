"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, SlidersHorizontal, Scale, Check } from "lucide-react";
import type { Project } from "@/types";
import { cn } from "@/lib/utils";

const STATUS_FILTERS = ["All", "Upcoming", "Ongoing", "Completed"] as const;
const CATEGORY_FILTERS = [
  "All",
  "Residential",
  "Commercial",
  "Luxury",
  "Affordable",
] as const;

const STATUS_STYLES: Record<Project["status"], string> = {
  Upcoming: "badge-blue",
  Ongoing: "badge-gold",
  Completed: "badge-green",
};

interface ProjectsGridProps {
  projects?: Project[];
  initialProjects?: Project[];
  compare?: string[];
  toggleCompare?: (id: string) => void;
}

export function ProjectsGrid({
  projects,
  initialProjects,
  compare = [],
  toggleCompare,
}: ProjectsGridProps) {
  const [statusFilter, setStatusFilter] =
    useState<(typeof STATUS_FILTERS)[number]>("All");
  const [categoryFilter, setCategoryFilter] =
    useState<(typeof CATEGORY_FILTERS)[number]>("All");

  const projectList = useMemo(
    () => projects ?? initialProjects ?? [],
    [projects, initialProjects]
  );

  const filtered = useMemo(() => {
    return projectList.filter((p) => {
      const statusMatch = statusFilter === "All" || p.status === statusFilter;
      const categoryMatch =
        categoryFilter === "All" || p.category === categoryFilter;
      return statusMatch && categoryMatch;
    });
  }, [projectList, statusFilter, categoryFilter]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-2 text-charcoal-500 dark:text-charcoal-300">
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-medium">
            {filtered.length} Projects
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium font-body transition-all duration-200 border",
                statusFilter === s
                  ? "bg-gold-500 text-charcoal-900 border-gold-500"
                  : "border-ivory-300 dark:border-charcoal-600 text-charcoal-500 dark:text-charcoal-300 hover:border-gold-400",
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-10">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c}
            onClick={() => setCategoryFilter(c)}
            className={cn(
              "px-3.5 py-1.5 rounded-full text-xs font-medium font-body transition-all duration-200 border",
              categoryFilter === c
                ? "bg-charcoal-800 dark:bg-ivory-100 text-white dark:text-charcoal-900 border-charcoal-800 dark:border-ivory-100"
                : "border-ivory-300 dark:border-charcoal-600 text-charcoal-500 dark:text-charcoal-300 hover:border-charcoal-400",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="text-charcoal-400 font-body">
            No projects match your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => {
            const isComparing = compare.includes(project.id);

            return (
              <div key={project.id} className="card group relative overflow-hidden">
                {toggleCompare && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleCompare(project.id);
                    }}
                    aria-pressed={isComparing}
                    aria-label={
                      isComparing
                        ? `Remove ${project.name} from comparison`
                        : `Add ${project.name} to comparison`
                    }
                    className={cn(
                      "absolute top-3 right-3 z-10 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-200",
                      isComparing
                        ? "bg-gold-500 text-charcoal-900"
                        : "bg-charcoal-900/70 text-ivory-100 hover:bg-charcoal-900/90",
                    )}
                  >
                    {isComparing ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <Scale className="w-3.5 h-3.5" />
                    )}
                    {isComparing ? "Added" : "Compare"}
                  </button>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  className="block overflow-hidden"
                >
                  <div className="relative h-64 overflow-hidden bg-ivory-200 dark:bg-charcoal-700">
                    <Image
                      src={project.elevationImageUrl || "/images/placeholder.jpg"}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 left-3 ${STATUS_STYLES[project.status]}`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-xl font-semibold text-charcoal-800 dark:text-ivory-100 mb-1 group-hover:text-gold-500 dark:group-hover:text-gold-400 transition-colors">
                      {project.name}
                    </h3>
                    <p className="font-body text-sm text-charcoal-500 dark:text-charcoal-300 mb-3 line-clamp-1">
                      {project.tagline}
                    </p>
                    <div className="flex items-center gap-1.5 text-sm text-charcoal-500 dark:text-charcoal-400 mb-4">
                      <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-gold-400" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-ivory-200 dark:border-charcoal-600">
                      <div>
                        <p className="font-mono text-2xs tracking-wider uppercase text-charcoal-400 mb-0.5">
                          Starting From
                        </p>
                        <p className="font-display text-lg font-semibold text-gold-500">
                          {project.priceRange}
                        </p>
                      </div>
                      <span className="flex items-center gap-1.5 text-xs font-medium text-gold-500 group-hover:gap-2.5 transition-all">
                        View Details <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
