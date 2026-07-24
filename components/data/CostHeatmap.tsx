"use client";

import { useState } from "react";
import { SEQUENTIAL, rampStep, rampTextColor } from "./viz";
import { costCategories, costMatrix, countries } from "@/lib/dataMetrics";

/**
 * Cost-of-living matrix as a heatmap.
 *
 * Replaces a four-series radar chart, where overlapping polygons made any
 * pairwise comparison guesswork. A grid of magnitudes is the form the skill
 * points to for exactly this data, and it scales to any number of countries.
 *
 * Colour job: sequential — one cyan hue, light → dark. Every cell also prints
 * its value, so the encoding is never colour-only.
 */
export function CostHeatmap({ countryIds }: { countryIds: string[] }) {
  const [hover, setHover] = useState<{ row: string; col: number } | null>(null);
  const scoped = countries.filter((c) => countryIds.includes(c.id));

  const all = scoped.flatMap((c) => costMatrix[c.id]);
  const min = Math.min(...all);
  const max = Math.max(...all);

  if (scoped.length === 0) {
    return (
      <p className="text-[13px] text-neutral-400 font-light py-8">
        No countries selected.
      </p>
    );
  }

  return (
    <div>
      <div className="overflow-x-auto -mx-1 px-1">
        <table className="w-full border-collapse min-w-[560px]">
          <caption className="sr-only">
            Cost of living by category and country, indexed to New York = 100.
            Lower is cheaper.
          </caption>
          <thead>
            <tr>
              <th scope="col" className="text-left w-[120px]" />
              {costCategories.map((category) => (
                <th
                  key={category}
                  scope="col"
                  className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium pb-2.5 px-1 text-center"
                >
                  {category}
                </th>
              ))}
              <th
                scope="col"
                className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium pb-2.5 pl-3 text-right"
              >
                Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {scoped.map((country) => {
              const row = costMatrix[country.id];
              const avg = Math.round(row.reduce((a, b) => a + b, 0) / row.length);

              return (
                <tr key={country.id}>
                  <th
                    scope="row"
                    className="text-[13px] text-neutral-600 font-light text-left pr-3 py-0.5 truncate"
                  >
                    {country.name}
                  </th>
                  {row.map((value, i) => {
                    const step = rampStep(value, min, max);
                    const isHover =
                      hover?.row === country.id && hover?.col === i;

                    return (
                      <td key={i} className="p-[2px]">
                        <div
                          onMouseEnter={() => setHover({ row: country.id, col: i })}
                          onMouseLeave={() => setHover(null)}
                          className="h-9 rounded-[5px] flex items-center justify-center text-[12px] tabular-nums transition-transform duration-150"
                          style={{
                            background: step,
                            color: rampTextColor(step),
                            transform: isHover ? "scale(1.06)" : "none",
                            boxShadow: isHover
                              ? "0 2px 10px rgba(0,0,0,.14)"
                              : "none",
                          }}
                        >
                          {value}
                        </div>
                      </td>
                    );
                  })}
                  <td className="pl-3 text-right text-[13px] tabular-nums text-neutral-500 font-light">
                    {avg}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Scale legend */}
      <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center gap-3 flex-wrap">
        <span className="text-[11px] text-neutral-400">Cheaper</span>
        <span className="flex gap-[3px]">
          {SEQUENTIAL.map((step) => (
            <span
              key={step}
              className="w-8 h-3 rounded-[3px]"
              style={{ background: step }}
            />
          ))}
        </span>
        <span className="text-[11px] text-neutral-400">Costlier</span>
        <span className="text-[11px] text-neutral-400 ml-auto">
          New York = 100 &middot; lower is better
        </span>
      </div>
    </div>
  );
}
