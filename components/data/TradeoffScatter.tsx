"use client";

import {
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceArea,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  type ChartConfig,
} from "@/components/ui/chart";
import { VIZ } from "./viz";
import { countries, metrics } from "@/lib/dataMetrics";

const config: ChartConfig = {
  investment: { label: "Minimum investment (€K)" },
  days: { label: "Processing time (days)" },
};

/**
 * The page's one genuine two-dimensional question: what does speed cost?
 *
 * Both axes are "lower is better", so the bottom-left quadrant is the
 * favourable zone — it is tinted and labelled rather than left for the reader
 * to infer. Points inside it take the accent; everything else stays neutral.
 */
export function TradeoffScatter({ countryIds }: { countryIds: string[] }) {
  const investment = metrics.find((m) => m.id === "minInvestment")!;
  const processing = metrics.find((m) => m.id === "processingDays")!;

  const points = countries
    .filter((c) => countryIds.includes(c.id))
    .map((c) => ({
      id: c.id,
      name: c.name,
      investment: investment.values[c.id],
      days: processing.values[c.id],
    }));

  if (points.length === 0) {
    return (
      <p className="text-[13px] text-neutral-400 font-light py-8">
        No countries selected.
      </p>
    );
  }

  const maxInvestment = Math.max(...points.map((p) => p.investment));
  const maxDays = Math.max(...points.map((p) => p.days));
  // Sweet spot: below the midpoint of the observed range on both axes.
  const investmentCut = maxInvestment * 0.55;
  const daysCut = maxDays * 0.45;
  const isFavourable = (p: (typeof points)[number]) =>
    p.investment <= investmentCut && p.days <= daysCut;

  return (
    <div>
      {/* Axis titles live outside the plot so they can never collide with ticks */}
      <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-2">
        <span>↑ Processing time (days)</span>
        <span>Minimum investment (€K) →</span>
      </div>

      <ChartContainer config={config} className="h-[340px] w-full">
        <ScatterChart margin={{ top: 16, right: 28, bottom: 8, left: 4 }}>
          <CartesianGrid stroke={VIZ.grid} />
          <ReferenceArea
            x1={0}
            x2={investmentCut}
            y1={0}
            y2={daysCut}
            fill={VIZ.accent}
            fillOpacity={0.07}
            stroke={VIZ.accent}
            strokeOpacity={0.25}
          />
          <XAxis
            type="number"
            dataKey="investment"
            name="Minimum investment"
            unit="K"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
            stroke={VIZ.axis}
            domain={[0, Math.ceil((maxInvestment * 1.15) / 50) * 50]}
          />
          <YAxis
            type="number"
            dataKey="days"
            name="Processing time"
            unit="d"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            fontSize={11}
            stroke={VIZ.axis}
            domain={[0, Math.ceil((maxDays * 1.15) / 30) * 30]}
            width={46}
          />
          <ZAxis range={[150, 150]} />
          <ChartTooltip
            cursor={{ strokeDasharray: "0", stroke: VIZ.grid }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const point = payload[0].payload as (typeof points)[number];
              return (
                <div className="rounded-lg border border-neutral-200 bg-white px-3 py-2 shadow-sm">
                  <div className="text-[13px] font-medium text-black mb-1">
                    {point.name}
                  </div>
                  <div className="text-[12px] text-neutral-500 tabular-nums">
                    €{point.investment}K &middot; {point.days} days
                  </div>
                </div>
              );
            }}
          />
          <Scatter data={points} isAnimationActive={false}>
            {points.map((point) => (
              <Cell
                key={point.id}
                fill={isFavourable(point) ? VIZ.accent : VIZ.neutralStrong}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
            <LabelList
              dataKey="name"
              position="top"
              offset={10}
              fontSize={11}
              fill="#525252"
            />
          </Scatter>
        </ScatterChart>
      </ChartContainer>

      <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center gap-4 text-[11px] text-neutral-400 flex-wrap">
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ background: VIZ.accent }}
          />
          Low entry &amp; fast
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ background: VIZ.neutralStrong }}
          />
          Everything else
        </span>
        <span className="ml-auto">Both axes: lower is better</span>
      </div>
    </div>
  );
}
