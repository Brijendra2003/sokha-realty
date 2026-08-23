"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/types";

import { PropertyFilter } from "./PropertyFilter";
import { ProjectsGrid } from "./ProjectsGrid";
import { CompareBox } from "./CompareBox";

export interface ProjectFilters {
  locations: string[];
  configurations: string[];
  statuses: Project["status"][];

  minBudget?: number;
  maxBudget?: number;

  search: string;
}

interface ProjectClientsProps {
  projects: Project[];
}

function parsePrice(price: string) {
  /**
   * Converts:
   *
   * ₹85 L – ₹1.05 Cr
   * ₹72 L
   * ₹1.5 Cr
   *
   * into rupees
   */

  const match = price.match(/([\d.]+)\s*(L|Cr)/i);

  if (!match) return 0;

  const value = Number(match[1]);

  const unit = match[2].toLowerCase();

  if (unit === "cr") return value * 10000000;

  return value * 100000;
}

export function ProjectClients({ projects }: ProjectClientsProps) {
  const [filters, setFilters] = useState<ProjectFilters>({
    locations: [],
    configurations: [],
    statuses: [],

    minBudget: undefined,
    maxBudget: undefined,

    search: "",
  });

  const [compareProjects, setCompareProjects] = useState<string[]>([]);

  const toggleCompare = (id: string) => {
    setCompareProjects((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }

      if (prev.length >= 3) {
        return prev;
      }

      return [...prev, id];
    });
  };

  const clearCompare = () => {
    setCompareProjects([]);
  };

  const filteredProjects = useMemo(() => {
    return (projects || []).filter((project) => {
      // Search

      if (
        filters.search &&
        !project.name.toLowerCase().includes(filters.search.toLowerCase()) &&
        !project.location.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Location

      if (
        filters.locations.length &&
        !filters.locations.includes(project.location)
      ) {
        return false;
      }

      // Status

      if (
        filters.statuses.length &&
        !filters.statuses.includes(project.status)
      ) {
        return false;
      }

      // Configuration

      if (filters.configurations.length) {
        const configs = project.configurations.map((c) => c.type);

        const hasConfig = filters.configurations.some((config) =>
          configs.includes(config),
        );

        if (!hasConfig) return false;
      }

      // Budget

      const price = parsePrice(project.priceRange);

      if (filters.minBudget && price < filters.minBudget) {
        return false;
      }

      if (filters.maxBudget && price > filters.maxBudget) {
        return false;
      }

      return true;
    });
  }, [projects, filters]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <PropertyFilter
          projects={projects}
          filters={filters}
          setFilters={setFilters}
        />

        <ProjectsGrid
          projects={filteredProjects}
          compare={compareProjects}
          toggleCompare={toggleCompare}
        />
      </div>

      <CompareBox
        selected={compareProjects}
        projects={projects}
        clear={clearCompare}
        onRemove={toggleCompare}
      />
    </>
  );
}
