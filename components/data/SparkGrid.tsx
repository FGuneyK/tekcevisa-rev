"use client";

import { VIZ } from "./viz";
import {
  countries,
  propertyIndex,
  trendYears,
} from "@/lib/dataMetrics";

/**
 * Small multiples — one sparkline per destination, all on the same 2021 = 100
 * index so the panels are directly comparable on a single scale.
 *
 * This replaces a five-country overlay where Malta (0.5M) and Türkiye (86M)
 * shared one axis and the small series were flat lines against the bottom.
 * Indexing to a common base is the fix the reader can actually read.
 */
function Spark({
  values,
  highlight,
}: {
  values: number[];
  highlight: boolean;
}) {
  const width = 150;
  const height = 44;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const points = values.map((value, i) => {
    const x = (i / (values.length - 1)) * width;
    const y = height - ((value - min) / span) * (height - 6) - 3;
    return [x, y] as const;
  });

  const line = points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `0,${height} ${line} ${width},${height}`;
  const [lastX, lastY] = points[points.length - 1];
  const stroke = highlight ? VIZ.accentInk : VIZ.neutralStrong;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-11 overflow-visible"
      aria-hidden="true"
    >
      <polygon
        points={area}
        fill={stroke}
        opacity={highlight ? 0.1 : 0.06}
      />
      <polyline
        points={line}
        fill="none"
        stroke={stroke}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r={3.5} fill={stroke} stroke="#fff" strokeWidth={2} />
    </svg>
  );
}

export function SparkGrid({ countryIds }: { countryIds: string[] }) {
  const scoped = countries.filter((c) => countryIds.includes(c.id));

  const growth = (id: string) => {
    const series = propertyIndex[id];
    return series[series.length - 1] - series[0];
  };

  const leader = scoped.length
    ? scoped.reduce((best, c) => (growth(c.id) > growth(best.id) ? c : best))
    : null;

  if (scoped.length === 0) {
    return (
      <p className="text-[13px] text-neutral-400 font-light py-8">
        No countries selected.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-5 gap-y-7">
        {scoped.map((country) => {
          const series = propertyIndex[country.id];
          const change = growth(country.id);
          const isLeader = leader?.id === country.id;

          return (
            <figure
              key={country.id}
              className={`rounded-xl px-3 pt-2.5 pb-2 border transition-colors ${
                isLeader ? "border-transparent" : "border-transparent"
              }`}
              style={isLeader ? { background: "rgba(0,183,208,.05)" } : undefined}
            >
              <figcaption className="mb-1">
                <div
                  className={`text-[13px] truncate ${
                    isLeader ? "text-black font-medium" : "text-neutral-600 font-light"
                  }`}
                >
                  {country.name}
                </div>
                <div
                  className="text-[17px] tabular-nums font-medium leading-tight"
                  style={{ color: isLeader ? VIZ.accentInk : "#525252" }}
                >
                  +{change}
                  <span className="text-[11px] font-light text-neutral-400 ml-1">
                    pts
                  </span>
                </div>
              </figcaption>
              <Spark values={series} highlight={isLeader} />
              <div className="flex justify-between text-[10px] text-neutral-300 mt-0.5 tabular-nums">
                <span>{trendYears[0]}</span>
                <span>{trendYears[trendYears.length - 1]}</span>
              </div>
            </figure>
          );
        })}
      </div>

      <p className="mt-6 pt-3 border-t border-neutral-100 text-[11px] text-neutral-400">
        Prime residential price index, {trendYears[0]} = 100. Each panel shares the
        same base, so the slopes are comparable. Accent marks the strongest growth
        in the current selection.
      </p>
    </div>
  );
}
