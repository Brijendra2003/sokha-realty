"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import type { Project } from "@/types";
import type { ProjectFilters } from "./ProjectClients";

interface PropertyFilterProps {
  projects: Project[];
  filters: ProjectFilters;
  setFilters: Dispatch<SetStateAction<ProjectFilters>>;
}

const budgetOptions = [
  { label: "No Min", value: undefined },
  { label: "25 L", value: 2500000 },
  { label: "50 L", value: 5000000 },
  { label: "75 L", value: 7500000 },
  { label: "1 Cr", value: 10000000 },
  { label: "1.5 Cr", value: 15000000 },
  { label: "2 Cr", value: 20000000 },
  { label: "3 Cr", value: 30000000 },
  { label: "5 Cr", value: 50000000 },
];

export function PropertyFilter({
  projects,
  filters,
  setFilters,
}: PropertyFilterProps) {
  const [search, setSearch] = useState("");

  // Unique Locations
  const locations = useMemo(() => {
    return [...new Set((projects || []).map((p) => p.location))].sort();
  }, [projects]);

  // Unique Configurations
  const configurations = useMemo(() => {
    const configs = new Set<string>();

    (projects || []).forEach((project) => {
      (project.configurations || []).forEach((config) => {
        configs.add(config.type);
      });
    });

    return [...configs].sort();
  }, [projects]);

  const filteredLocations = locations.filter((location) =>
    location.toLowerCase().includes(search.toLowerCase()),
  );

  const toggleLocation = (location: string) => {
    setFilters((prev) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l) => l !== location)
        : [...prev.locations, location],
    }));
  };

  const toggleConfiguration = (config: string) => {
    setFilters((prev) => ({
      ...prev,
      configurations: prev.configurations.includes(config)
        ? prev.configurations.filter((c) => c !== config)
        : [...prev.configurations, config],
    }));
  };

  const toggleStatus = (status: Project["status"]) => {
    setFilters((prev) => ({
      ...prev,
      statuses: prev.statuses.includes(status)
        ? prev.statuses.filter((s) => s !== status)
        : [...prev.statuses, status],
    }));
  };

  const clearAll = () => {
    setFilters({
      locations: [],
      configurations: [],
      statuses: [],
      minBudget: undefined,
      maxBudget: undefined,
      search: "",
    });

    setSearch("");
  };

  return (
    <aside className="sticky top-24 h-fit rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-charcoal-700 dark:bg-charcoal-800">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-charcoal-800 dark:text-white">
          Filters
        </h2>

        <button
          onClick={clearAll}
          className="text-xs font-medium text-gold-500 hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Location */}
      <SectionTitle title="Location" />

      <input
        type="text"
        placeholder="Search locality..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-gold-500 dark:border-charcoal-600 dark:bg-charcoal-900"
      />

      <div className="mb-6 max-h-48 space-y-2 overflow-y-auto pr-2">
        {filteredLocations.map((location) => (
          <Checkbox
            key={location}
            label={location}
            checked={filters.locations.includes(location)}
            onChange={() => toggleLocation(location)}
          />
        ))}
      </div>

      <Divider />

      {/* Configuration */}
      <SectionTitle title="Configuration" />

      <div className="mb-6 space-y-2">
        {configurations.map((config) => (
          <Checkbox
            key={config}
            label={config}
            checked={filters.configurations.includes(config)}
            onChange={() => toggleConfiguration(config)}
          />
        ))}
      </div>

      <Divider />

      {/* Budget */}
      <SectionTitle title="Budget" />

      <div className="mb-6 grid grid-cols-2 gap-2">
        <select
          value={filters.minBudget ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              minBudget: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          className="rounded-lg border border-gray-300 px-2 py-2 text-sm dark:border-charcoal-600 dark:bg-charcoal-900"
        >
          {budgetOptions.map((budget) => (
            <option key={budget.label} value={budget.value ?? ""}>
              {budget.label}
            </option>
          ))}
        </select>

        <select
          value={filters.maxBudget ?? ""}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxBudget: e.target.value ? Number(e.target.value) : undefined,
            }))
          }
          className="rounded-lg border border-gray-300 px-2 py-2 text-sm dark:border-charcoal-600 dark:bg-charcoal-900"
        >
          {budgetOptions.map((budget) => (
            <option key={budget.label} value={budget.value ?? ""}>
              {budget.label}
            </option>
          ))}
        </select>
      </div>

      <Divider />

      {/* Status */}
      <SectionTitle title="Possession Status" />

      <div className="space-y-2">
        {(["Upcoming", "Ongoing", "Completed"] as Project["status"][]).map(
          (status) => (
            <Checkbox
              key={status}
              label={status}
              checked={filters.statuses.includes(status)}
              onChange={() => toggleStatus(status)}
            />
          ),
        )}
      </div>
    </aside>
  );
}

/* ---------- Small Components ---------- */

function Divider() {
  return (
    <div className="my-5 border-t border-gray-200 dark:border-charcoal-700" />
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-700 dark:text-charcoal-200">
      {title}
    </h3>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-charcoal-600 dark:text-charcoal-300">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 rounded border-gray-300 accent-yellow-500"
      />
      {label}
    </label>
  );
}
