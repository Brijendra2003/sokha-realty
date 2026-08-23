"use client";

import { useState } from "react";
import { X, ChevronUp, ChevronDown, Scale } from "lucide-react";
import type { Project } from "@/types";

interface CompareBoxProps {
  selected: string[];
  projects: Project[];
  clear: () => void;
  onRemove?: (id: string) => void;
}

const MAX_COMPARE = 3;

export function CompareBox({ selected, projects, clear, onRemove }: CompareBoxProps) {
  const [expanded, setExpanded] = useState(false);

  const compareProjects = (projects || []).filter((p) => selected?.includes(p.id));

  if (compareProjects.length === 0) return null;

  const rows: { label: string; render: (p: Project) => React.ReactNode }[] = [
    {
      label: "Location",
      render: (p) => p.location,
    },
    {
      label: "Status",
      render: (p) => p.status,
    },
    {
      label: "Category",
      render: (p) => p.category,
    },
    {
      label: "Price range",
      render: (p) => p.priceRange,
    },
    {
      label: "Configurations",
      render: (p) => p.configurations.map((c) => c.type).join(", ") || "—",
    },
    {
      label: "Total units",
      render: (p) => (p.totalUnits ? p.totalUnits.toLocaleString("en-IN") : "—"),
    },
    {
      label: "Possession",
      render: (p) => p.possessionDate || "—",
    },
    {
      label: "RERA",
      render: (p) => p.rera || "—",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      {/* Expanded comparison table */}
      {expanded && (
        <div className="border-t border-ivory-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-800 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] max-h-[70vh] overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-charcoal-800 dark:text-ivory-100">
                Comparing {compareProjects.length} project
                {compareProjects.length > 1 ? "s" : ""}
              </h3>
              <button
                onClick={() => setExpanded(false)}
                className="flex items-center gap-1 text-sm text-charcoal-500 dark:text-charcoal-300 hover:text-gold-500 transition-colors"
              >
                Collapse
                <ChevronDown size={16} />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="w-32 sm:w-40" />
                    {compareProjects.map((p) => (
                      <th key={p.id} className="min-w-[180px] px-3 pb-4 text-left align-top">
                        <div className="relative overflow-hidden rounded-lg bg-ivory-200 dark:bg-charcoal-700 aspect-[4/3] mb-2">
                          {p.elevationImageUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={p.elevationImageUrl}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          )}
                          <button
                            onClick={() => onRemove?.(p.id)}
                            aria-label={`Remove ${p.name} from comparison`}
                            className="absolute top-1.5 right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-900/70 text-ivory-100 hover:bg-charcoal-900/90 backdrop-blur-sm transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="font-display font-semibold text-charcoal-800 dark:text-ivory-100 leading-snug">
                          {p.name}
                        </div>
                        <div className="font-body text-xs text-charcoal-500 dark:text-charcoal-300 mt-0.5">
                          {p.tagline}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, i) => (
                    <tr
                      key={row.label}
                      className={i % 2 === 0 ? "bg-ivory-100/60 dark:bg-charcoal-700/40" : ""}
                    >
                      <td className="px-3 py-3 font-mono text-2xs font-medium uppercase tracking-wide text-charcoal-400 align-top">
                        {row.label}
                      </td>
                      {compareProjects.map((p) => (
                        <td
                          key={p.id}
                          className="px-3 py-3 font-body text-charcoal-700 dark:text-ivory-200 align-top"
                        >
                          {row.label === "Price range" ? (
                            <span className="font-display font-semibold text-gold-500">
                              {row.render(p)}
                            </span>
                          ) : (
                            row.render(p)
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Collapsed floating tray */}
      <div className="border-t border-ivory-300 dark:border-charcoal-600 bg-white dark:bg-charcoal-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3 overflow-x-auto">
            <div className="flex items-center gap-1.5 text-sm font-medium text-charcoal-700 dark:text-ivory-200 shrink-0">
              <Scale size={16} className="text-gold-400" />
              {compareProjects.length}/{MAX_COMPARE}
            </div>
            <div className="flex items-center gap-2">
              {compareProjects.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-1.5 rounded-full border border-ivory-300 dark:border-charcoal-600 bg-ivory-100 dark:bg-charcoal-700 py-1 pl-3 pr-1.5 text-xs font-medium text-charcoal-700 dark:text-ivory-200 whitespace-nowrap"
                >
                  {p.name}
                  <button
                    onClick={() => onRemove?.(p.id)}
                    aria-label={`Remove ${p.name}`}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-charcoal-400 hover:bg-charcoal-200 dark:hover:bg-charcoal-600 hover:text-charcoal-700 dark:hover:text-ivory-100 transition-colors"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clear}
              className="text-sm text-charcoal-500 dark:text-charcoal-300 hover:text-charcoal-900 dark:hover:text-ivory-100 transition-colors px-2"
            >
              Clear
            </button>
            <button
              onClick={() => setExpanded((e) => !e)}
              disabled={compareProjects.length < 2}
              className="flex items-center gap-1.5 rounded-full bg-gold-500 px-4 py-2 text-sm font-medium text-charcoal-900 transition-colors hover:bg-gold-400 disabled:cursor-not-allowed disabled:bg-ivory-300 disabled:text-charcoal-400"
            >
              {expanded ? "Hide" : "Compare"}
              {expanded ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
