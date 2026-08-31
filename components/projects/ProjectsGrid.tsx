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

/* Filter chips are pills that fill on selection — the same interaction
   shape as every CTA on the site, so selection reads instantly. */
function FilterChip({
  active,
  onClick,
  children,
  variant = "gold",
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  variant?: "gold" | "navy";
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 font-body text-xs font-medium transition-all duration-300",
        active
          ? variant === "gold"
            ? "border-champagne-500 bg-champagne-500 text-navy-900 shadow-gold-sm"
            : "border-navy-800 bg-navy-800 text-white dark:border-sand-100 dark:bg-sand-100 dark:text-navy-900"
          : "border-sand-300 bg-white text-navy-500 hover:-translate-y-0.5 hover:border-champagne-400 hover:text-champagne-700 dark:border-navy-600 dark:bg-navy-700 dark:text-sand-300",
      )}
    >
      {children}
    </button>
  );
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
    [projects, initialProjects],
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
      {/* Filter bar — one soft panel holds both filter rows and the count */}
      <div className="mb-12 rounded-[28px] border border-sand-300 bg-sand-100 p-6 dark:border-navy-600 dark:bg-navy-900 md:p-7">
        <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <span className="icon-blob blob-champagne h-9 w-9">
              <SlidersHorizontal className="h-4 w-4" />
            </span>
            <span className="font-body text-sm font-semibold text-navy-700 dark:text-sand-200">
              {filtered.length}{" "}
              {filtered.length === 1 ? "project" : "projects"}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {STATUS_FILTERS.map((s) => (
              <FilterChip
                key={s}
                active={statusFilter === s}
                onClick={() => setStatusFilter(s)}
              >
                {s}
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 border-t border-sand-300 pt-5 dark:border-navy-600">
          <span className="mr-1 font-mono text-2xs uppercase tracking-label text-navy-400 dark:text-sand-500">
            Type
          </span>
          {CATEGORY_FILTERS.map((c) => (
            <FilterChip
              key={c}
              variant="navy"
              active={categoryFilter === c}
              onClick={() => setCategoryFilter(c)}
            >
              {c}
            </FilterChip>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="rounded-[28px] border border-dashed border-sand-300 py-24 text-center dark:border-navy-600">
          <p className="font-body text-navy-400 dark:text-sand-500">
            No projects match your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => {
            const isComparing = compare.includes(project.id);

            return (
              <div
                key={project.id}
                className="card-lift group relative flex h-full flex-col p-3"
              >
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
                      "absolute right-6 top-6 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm transition-all duration-300",
                      isComparing
                        ? "bg-champagne-500 text-navy-900"
                        : "bg-navy-900/70 text-sand-100 hover:bg-navy-900/90",
                    )}
                  >
                    {isComparing ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Scale className="h-3.5 w-3.5" />
                    )}
                    {isComparing ? "Added" : "Compare"}
                  </button>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  className="flex flex-1 flex-col"
                >
                  <div className="relative h-60 overflow-hidden rounded-[20px] bg-sand-200 dark:bg-navy-700">
                    <Image
                      src={project.elevationImageUrl || "/images/placeholder.jpg"}
                      alt={project.name}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-expo-out group-hover:scale-[1.07]"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-3 pt-5">
                    <h3 className="mb-1.5 font-display text-xl font-semibold text-navy-800 transition-colors group-hover:text-champagne-700 dark:text-sand-100 dark:group-hover:text-champagne-400">
                      {project.name}
                    </h3>
                    <p className="mb-3 line-clamp-1 font-body text-sm text-navy-500 dark:text-sand-400">
                      {project.tagline}
                    </p>

                    <div className="mb-5 flex items-center gap-1.5 font-mono text-2xs uppercase tracking-wider text-navy-500 dark:text-sand-400">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-champagne-500" />
                      <span className="truncate">{project.location}</span>
                    </div>

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
          })}
        </div>
      )}
    </div>
  );
}
