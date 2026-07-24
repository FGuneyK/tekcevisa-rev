"use client";

import { useState } from "react";
import { VIZ } from "./viz";
import {
  formatValue,
  rankedRows,
  bestCountries,
  type Metric,
} from "@/lib/dataMetrics";

/**
 * Ranking bars for a single metric, built in plain HTML so the value label can
 * never be clipped by a short bar.
 *
 * Colour job: emphasis — the best-performing destination takes the accent, the
 * rest stay neutral. Bar length already encodes magnitude, so hue is spent only
 * on the one thing the reader is looking for.
 */
export function RankChart({
  metric,
  countryIds,
}: {
  metric: Metric;
  countryIds: string[];
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const rows = rankedRows(metric, countryIds);
  const winners = bestCountries(metric, countryIds);
  const max = Math.max(...rows.map((r) => r.value), 1);

  if (rows.length === 0) {
    return (
      <p className="text-[13px] text-neutral-400 font-light py-8">
        No countries selected.
      </p>
    );
  }

  return (
    <div>
      <ul className="space-y-1.5">
        {rows.map((row) => {
          const isBest = winners.includes(row.id);
          // A zero still gets a visible stub, otherwise the row reads as broken.
          const width = Math.max((row.value / max) * 100, 0.8);

          return (
            <li
              key={row.id}
              onMouseEnter={() => setHovered(row.id)}
              onMouseLeave={() => setHovered(null)}
              className="grid grid-cols-[104px_1fr_auto] items-center gap-3 py-1 rounded-md transition-colors"
              style={{ background: hovered === row.id ? "#fafafa" : "transparent" }}
            >
              <span
                className={`text-[13px] truncate ${
                  isBest ? "text-black font-medium" : "text-neutral-500 font-light"
                }`}
              >
                {row.name}
              </span>

              <span className="relative block h-6" aria-hidden="true">
                <span
                  className="absolute inset-y-0 left-0 rounded-r-[4px] transition-[width] duration-500 ease-out"
                  style={{
                    width: `${width}%`,
                    background: isBest ? VIZ.accent : VIZ.neutral,
                  }}
                />
              </span>

              <span className="flex items-center gap-2 justify-end min-w-[104px]">
                <span
                  className={`text-[13px] tabular-nums ${
                    isBest ? "font-medium" : "text-neutral-500 font-light"
                  }`}
                  style={isBest ? { color: VIZ.accentInk } : undefined}
                >
                  {formatValue(metric, row.value)}
                </span>
              </span>

              <span className="sr-only">
                {row.name}: {formatValue(metric, row.value)}
                {isBest ? " — best in this metric" : ""}
              </span>
            </li>
          );
        })}
      </ul>

      <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center gap-4 text-[11px] text-neutral-400">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-sm inline-block"
            style={{ background: VIZ.accent }}
          />
          Best
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-sm inline-block"
            style={{ background: VIZ.neutral }}
          />
          Other destinations
        </span>
        <span className="ml-auto">
          {metric.better === "higher" ? "Higher is better" : "Lower is better"}
        </span>
      </div>
    </div>
  );
}
