"use client";

import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Check, Search, SlidersHorizontal } from "lucide-react";
import type { Project } from "@/types";
import type { ProjectFilters } from "./ProjectClients";
import { cn } from "@/lib/utils";

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

  const activeCount =
    filters.locations.length +
    filters.configurations.length +
    filters.statuses.length +
    (filters.minBudget ? 1 : 0) +
    (filters.maxBudget ? 1 : 0);

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
    <aside className="sticky top-28 h-fit rounded-[28px] border border-sand-300 bg-white p-6 shadow-soft dark:border-navy-600 dark:bg-navy-700">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="icon-blob blob-champagne h-9 w-9">
            <SlidersHorizontal className="h-4 w-4" />
          </span>
          <h2 className="font-display text-lg font-semibold text-navy-800 dark:text-sand-100">
            Filters
          </h2>
          {activeCount > 0 && (
            <span className="badge-clay">{activeCount}</span>
          )}
        </div>

        <button
          onClick={clearAll}
          className="font-mono text-2xs uppercase tracking-label text-champagne-700 transition-colors hover:text-clay-600 dark:text-champagne-400"
        >
          Clear
        </button>
      </div>

      {/* Location */}
      <SectionTitle title="Location" />

      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-navy-400" />
        <input
          type="text"
          placeholder="Search locality…"
          aria-label="Search locality"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input py-2.5 pl-10 text-sm"
        />
      </div>

      <div className="no-scrollbar mb-6 max-h-48 space-y-1 overflow-y-auto pr-1">
        {filteredLocations.length === 0 ? (
          <p className="px-1 py-2 font-body text-xs text-navy-400 dark:text-sand-500">
            No localities match “{search}”.
          </p>
        ) : (
          filteredLocations.map((location) => (
            <Checkbox
              key={location}
              label={location}
              checked={filters.locations.includes(location)}
              onChange={() => toggleLocation(location)}
            />
          ))
        )}
      </div>

      <Divider />

      {/* Configuration */}
      <SectionTitle title="Configuration" />

      <div className="mb-6 space-y-1">
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

      <div className="mb-6 grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="min-budget" className="form-label">
            Min
          </label>
          <select
            id="min-budget"
            value={filters.minBudget ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minBudget: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="form-input py-2.5"
          >
            {budgetOptions.map((budget) => (
              <option key={budget.label} value={budget.value ?? ""}>
                {budget.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="max-budget" className="form-label">
            Max
          </label>
          <select
            id="max-budget"
            value={filters.maxBudget ?? ""}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxBudget: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="form-input py-2.5"
          >
            {budgetOptions.map((budget) => (
              <option key={budget.label} value={budget.value ?? ""}>
                {budget.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Divider />

      {/* Status */}
      <SectionTitle title="Possession Status" />

      <div className="space-y-1">
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
  return <div className="my-5 border-t border-sand-300 dark:border-navy-600" />;
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="mb-3 font-mono text-2xs font-medium uppercase tracking-label text-champagne-700 dark:text-champagne-400">
      {title}
    </h3>
  );
}

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

/* A custom rounded control — the native checkbox can't be given the
   pill/blob geometry the rest of the site uses. The real input stays in
   the DOM (visually hidden) so keyboard and screen readers are unaffected. */
function Checkbox({ label, checked, onChange }: CheckboxProps) {
  return (
    <label className="group flex cursor-pointer items-center gap-3 rounded-full px-2 py-1.5 font-body text-sm text-navy-600 transition-colors hover:bg-sand-100 dark:text-sand-300 dark:hover:bg-navy-800">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-champagne-500 peer-focus-visible:ring-offset-2",
          checked
            ? "border-champagne-500 bg-champagne-500 text-navy-900"
            : "border-sand-400 bg-white group-hover:border-champagne-400 dark:border-navy-500 dark:bg-navy-800",
        )}
      >
        {checked && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
      </span>
      {label}
    </label>
  );
}
