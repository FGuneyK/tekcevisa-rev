"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MoveRight, RotateCcw, Check } from "lucide-react";
import { VIZ } from "./viz";
import { RankChart } from "./RankChart";
import { SparkGrid } from "./SparkGrid";
import { CostHeatmap } from "./CostHeatmap";
import { TradeoffScatter } from "./TradeoffScatter";
import { MetricTable } from "./MetricTable";
import {
  bestCountry,
  countries,
  countryIds as allCountryIds,
  formatValue,
  getCountry,
  metricsForArea,
  serviceAreas,
  type ServiceAreaId,
} from "@/lib/dataMetrics";

/* ------------------------------------------------------------------ */
/*  CARD                                                               */
/* ------------------------------------------------------------------ */

function Panel({
  title,
  description,
  children,
  wide = false,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <section
      className={`border border-neutral-200 rounded-2xl bg-white p-6 md:p-7 ${
        wide ? "lg:col-span-2" : ""
      }`}
    >
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="w-1 h-4 rounded-full"
            style={{ background: VIZ.accent }}
            aria-hidden="true"
          />
          <h2 className="font-serif text-xl text-black">{title}</h2>
        </div>
        <p className="text-[13px] text-neutral-500 font-light leading-relaxed">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  DASHBOARD                                                          */
/* ------------------------------------------------------------------ */

export function DataDashboard() {
  const [area, setArea] = useState<ServiceAreaId>("all");
  const [selected, setSelected] = useState<string[]>(allCountryIds);

  const areaMetrics = useMemo(() => metricsForArea(area), [area]);
  const activeArea = serviceAreas.find((a) => a.id === area)!;

  /* The headline metric drives the ranking panel and the first KPI. */
  const headline = areaMetrics[0];

  const toggleCountry = (id: string) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.length === 1
          ? prev // never empty the board
          : prev.filter((c) => c !== id)
        : [...prev, id]
    );
  };

  const reset = () => {
    setArea("all");
    setSelected(allCountryIds);
  };

  const isFiltered = area !== "all" || selected.length !== allCountryIds.length;

  /* KPIs are computed from the current slice — never static copy. */
  const kpis = useMemo(() => {
    const pick = (id: string) => areaMetrics.find((m) => m.id === id);

    const cards: { label: string; value: string; caption: string }[] = [
      {
        label: "Destinations in view",
        value: String(selected.length),
        caption:
          selected.length === allCountryIds.length
            ? "All markets we operate in"
            : `of ${allCountryIds.length} tracked`,
      },
      {
        label: "Metrics in this area",
        value: String(areaMetrics.length),
        caption: activeArea.label,
      },
    ];

    const speed = pick("processingDays");
    if (speed) {
      const winner = bestCountry(speed, selected);
      cards.push({
        label: "Fastest route",
        value: winner ? formatValue(speed, speed.values[winner]) : "—",
        caption: winner ? (getCountry(winner)?.name ?? "") : "",
      });
    }

    const entry = pick("minInvestment");
    if (entry) {
      const winner = bestCountry(entry, selected);
      cards.push({
        label: "Lowest entry",
        value: winner ? formatValue(entry, entry.values[winner]) : "—",
        caption: winner ? (getCountry(winner)?.name ?? "") : "",
      });
    }

    if (headline && cards.length < 4) {
      const winner = bestCountry(headline, selected);
      cards.push({
        label: `Best ${headline.label.toLowerCase()}`,
        value: winner ? formatValue(headline, headline.values[winner]) : "—",
        caption: winner ? (getCountry(winner)?.name ?? "") : "",
      });
    }

    return cards.slice(0, 4);
  }, [areaMetrics, selected, activeArea, headline]);

  return (
    <>
      {/* ---------- FILTER ROW — scopes everything below ---------- */}
      <div className="sticky top-[120px] z-30 -mx-[5vw] lg:-mx-10 px-[5vw] lg:px-10 py-4 bg-neutral-50/95 backdrop-blur-sm border-b border-neutral-200">
        <div className="flex flex-col 2xl:flex-row 2xl:items-start gap-4 2xl:gap-8">
          {/* Service area */}
          <div className="flex items-start gap-3 min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium flex-shrink-0 pt-2.5">
              Area of service
            </span>
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label="Filter by area of service"
            >
              {serviceAreas.map((option) => {
                const isActive = area === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setArea(option.id)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-2 text-[12px] font-medium rounded-full border whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-black text-white border-black"
                        : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400 hover:text-black"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden 2xl:block w-px h-7 bg-neutral-200 flex-shrink-0" />

          {/* Countries */}
          <div className="flex items-start gap-3 min-w-0">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium flex-shrink-0 pt-2.5">
              Destinations
            </span>
            <div
              className="flex flex-wrap gap-1.5"
              role="group"
              aria-label="Filter by destination"
            >
              {countries.map((country) => {
                const isOn = selected.includes(country.id);
                return (
                  <button
                    key={country.id}
                    type="button"
                    onClick={() => toggleCountry(country.id)}
                    aria-pressed={isOn}
                    className="px-3 py-2 text-[12px] font-medium rounded-full border whitespace-nowrap transition-colors inline-flex items-center gap-1.5"
                    style={
                      isOn
                        ? {
                            background: "rgba(0,183,208,.08)",
                            borderColor: "rgba(0,183,208,.45)",
                            color: VIZ.accentInk,
                          }
                        : {
                            background: "#fff",
                            borderColor: "#e5e5e5",
                            color: "#a3a3a3",
                          }
                    }
                  >
                    {isOn && <Check size={11} aria-hidden="true" />}
                    {country.name}
                  </button>
                );
              })}
            </div>
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 text-[12px] text-neutral-400 hover:text-black transition-colors flex-shrink-0 self-start pt-2.5 2xl:ml-auto"
            >
              <RotateCcw size={12} aria-hidden="true" /> Reset
            </button>
          )}
        </div>
      </div>

      {/* ---------- CONTEXT LINE ---------- */}
      <p className="text-[13px] text-neutral-500 font-light leading-relaxed max-w-3xl mt-8 mb-6">
        {activeArea.blurb}
      </p>

      {/* ---------- KPI ROW ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="border border-neutral-200 rounded-2xl bg-white px-6 py-5"
          >
            <div className="text-[10px] uppercase tracking-wider text-neutral-400 mb-2">
              {kpi.label}
            </div>
            <div className="text-3xl text-black mb-1 leading-none">
              {kpi.value}
            </div>
            <div className="text-[12px] text-neutral-400 font-light truncate">
              {kpi.caption}
            </div>
          </div>
        ))}
      </div>

      {/* ---------- PANELS ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {headline && (
          <Panel
            title={headline.label}
            description={headline.note}
          >
            <RankChart metric={headline} countryIds={selected} />
          </Panel>
        )}

        {areaMetrics[1] && (
          <Panel
            title={areaMetrics[1].label}
            description={areaMetrics[1].note}
          >
            <RankChart metric={areaMetrics[1]} countryIds={selected} />
          </Panel>
        )}

        {(area === "all" || area === "citizenship" || area === "residence") && (
          <Panel
            wide
            title="What does speed cost?"
            description="Minimum investment against processing time. The tinted zone is the favourable corner — low entry and fast turnaround at once."
          >
            <TradeoffScatter countryIds={selected} />
          </Panel>
        )}

        {areaMetrics[2] && (
          <Panel title={areaMetrics[2].label} description={areaMetrics[2].note}>
            <RankChart metric={areaMetrics[2]} countryIds={selected} />
          </Panel>
        )}

        {areaMetrics[3] && (
          <Panel title={areaMetrics[3].label} description={areaMetrics[3].note}>
            <RankChart metric={areaMetrics[3]} countryIds={selected} />
          </Panel>
        )}

        {(area === "all" || area === "realEstate") && (
          <Panel
            wide
            title="Property market momentum"
            description="Prime residential price index for every destination in view, on one common base."
          >
            <SparkGrid countryIds={selected} />
          </Panel>
        )}

        {(area === "all" ||
          area === "familyEducation" ||
          area === "residence") && (
          <Panel
            wide
            title="Cost of living, category by category"
            description="Where the money actually goes each month, indexed to New York = 100."
          >
            <CostHeatmap countryIds={selected} />
          </Panel>
        )}

        {areaMetrics.slice(4).map((metric) => (
          <Panel key={metric.id} title={metric.label} description={metric.note}>
            <RankChart metric={metric} countryIds={selected} />
          </Panel>
        ))}
      </div>

      {/* ---------- TABLE VIEW ---------- */}
      <section className="mt-6 border border-neutral-200 rounded-2xl bg-white p-6 md:p-7">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span
                className="w-1 h-4 rounded-full"
                style={{ background: VIZ.accent }}
                aria-hidden="true"
              />
              <h2 className="font-serif text-xl text-black">The numbers</h2>
            </div>
            <p className="text-[13px] text-neutral-500 font-light">
              Every figure above, sortable. Accent dots mark the best value per column.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-black hover:text-accent transition-colors"
          >
            Discuss these numbers <MoveRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <MetricTable metrics={areaMetrics} countryIds={selected} />
      </section>

      {/* ---------- SOURCES ---------- */}
      <section className="mt-6 border border-neutral-200 rounded-2xl bg-white p-6 md:p-7">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 font-medium mb-5">
          Sources &amp; method
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-3">
          {areaMetrics.map((metric) => (
            <div
              key={metric.id}
              className="flex items-baseline justify-between gap-4 py-2 border-b border-neutral-100"
            >
              <span className="text-[13px] text-neutral-600 font-light">
                {metric.label}
              </span>
              <span className="text-[11px] text-neutral-400 text-right flex-shrink-0">
                {metric.source}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[12px] text-neutral-400 font-light leading-relaxed mt-6 max-w-3xl">
          Figures are indicative and compiled for orientation, not as advice for a
          specific application. Thresholds, tax treatment and processing times change;
          every file is quoted against the rules in force on the day it opens.
        </p>
      </section>
    </>
  );
}
