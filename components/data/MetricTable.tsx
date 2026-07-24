"use client";

import { useState } from "react";
import { ArrowUpDown } from "lucide-react";
import { VIZ } from "./viz";
import {
  bestCountries,
  countries,
  formatValue,
  type Metric,
} from "@/lib/dataMetrics";

/**
 * The table view. Every figure plotted on this page is reachable here without
 * hovering anything — which is what lets the charts use an accent that sits
 * below 3:1 against white, and what makes the dashboard usable without colour.
 */
export function MetricTable({
  metrics,
  countryIds,
}: {
  metrics: Metric[];
  countryIds: string[];
}) {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [ascending, setAscending] = useState(true);

  const scoped = countries.filter((c) => countryIds.includes(c.id));

  const rows = [...scoped].sort((a, b) => {
    if (!sortBy) return 0;
    const metric = metrics.find((m) => m.id === sortBy);
    if (!metric) return 0;
    const diff = metric.values[a.id] - metric.values[b.id];
    return ascending ? diff : -diff;
  });

  const toggleSort = (id: string) => {
    if (sortBy === id) {
      setAscending((prev) => !prev);
    } else {
      setSortBy(id);
      setAscending(true);
    }
  };

  if (scoped.length === 0 || metrics.length === 0) {
    return (
      <p className="text-[13px] text-neutral-400 font-light py-8">
        Nothing to show for this selection.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto -mx-1 px-1">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Every tracked metric by destination. Accent dots mark the best value in
          each column.
        </caption>
        <thead>
          <tr className="border-b border-neutral-200">
            <th
              scope="col"
              className="sticky left-0 bg-white text-[10px] uppercase tracking-wider text-neutral-400 font-medium py-3 pr-4 whitespace-nowrap"
            >
              Destination
            </th>
            {metrics.map((metric) => (
              <th
                key={metric.id}
                scope="col"
                className="py-3 px-3 whitespace-nowrap align-bottom"
              >
                <button
                  type="button"
                  onClick={() => toggleSort(metric.id)}
                  className="group inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-medium transition-colors"
                  style={{ color: sortBy === metric.id ? VIZ.accentInk : "#a3a3a3" }}
                >
                  {metric.label}
                  <ArrowUpDown
                    size={11}
                    aria-hidden="true"
                    className="opacity-40 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="sr-only">
                    Sort by {metric.label}
                    {sortBy === metric.id
                      ? ascending
                        ? ", currently ascending"
                        : ", currently descending"
                      : ""}
                  </span>
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((country) => (
            <tr
              key={country.id}
              className="border-b border-neutral-100 hover:bg-neutral-50/70 transition-colors"
            >
              <th
                scope="row"
                className="sticky left-0 bg-white text-[13px] font-medium text-black py-3 pr-4 whitespace-nowrap"
              >
                {country.name}
              </th>
              {metrics.map((metric) => {
                const isBest = bestCountries(metric, countryIds).includes(
                  country.id
                );
                return (
                  <td
                    key={metric.id}
                    className="py-3 px-3 text-[13px] tabular-nums whitespace-nowrap"
                    style={{
                      color: isBest ? VIZ.accentInk : "#525252",
                      fontWeight: isBest ? 500 : 300,
                    }}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      {isBest && (
                        <span
                          aria-hidden="true"
                          className="w-1.5 h-1.5 rounded-full inline-block"
                          style={{ background: VIZ.accent }}
                        />
                      )}
                      {formatValue(metric, metric.values[country.id])}
                      {isBest && <span className="sr-only">(best)</span>}
                    </span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
