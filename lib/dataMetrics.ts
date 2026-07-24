/**
 * TEKCE Data — the dashboard's data model.
 *
 * Everything on /data is derived from this file: the filter bar, the KPI row,
 * every chart and the table view. A metric declares which service areas it
 * belongs to and which direction is "better", so the dashboard can highlight
 * the strongest destination per metric without hard-coding a winner.
 */

/* ------------------------------------------------------------------ */
/*  DIMENSIONS                                                         */
/* ------------------------------------------------------------------ */

export const serviceAreas = [
  { id: "all", label: "All services", blurb: "Every metric we track across all seven destinations." },
  { id: "citizenship", label: "Citizenship", blurb: "Investment thresholds, processing times and passport strength for citizenship-by-investment routes." },
  { id: "residence", label: "Residence", blurb: "Residence permit costs, timelines, presence requirements and how settled the expat community already is." },
  { id: "realEstate", label: "Real Estate", blurb: "Entry prices, rental yields and five-year capital growth in each market's prime districts." },
  { id: "taxBusiness", label: "Tax & Business", blurb: "Personal and corporate tax exposure, plus how quickly a company can be formed." },
  { id: "familyEducation", label: "Family & Education", blurb: "Schooling capacity, healthcare quality and the day-to-day cost of raising a family." },
] as const;

export type ServiceAreaId = (typeof serviceAreas)[number]["id"];

export interface Country {
  id: string;
  name: string;
  short: string;
  region: "Europe" | "Middle East" | "Caribbean";
  /** Programme page, where one exists. */
  href?: string;
}

export const countries: Country[] = [
  { id: "turkiye", name: "Türkiye", short: "TR", region: "Europe", href: "/citizenship/turkey" },
  { id: "portugal", name: "Portugal", short: "PT", region: "Europe" },
  { id: "spain", name: "Spain", short: "ES", region: "Europe" },
  { id: "malta", name: "Malta", short: "MT", region: "Europe" },
  { id: "latvia", name: "Latvia", short: "LV", region: "Europe" },
  { id: "uae", name: "UAE / Dubai", short: "AE", region: "Middle East", href: "/residence/dubai" },
  { id: "caribbean", name: "Caribbean", short: "CB", region: "Caribbean" },
];

export const countryIds = countries.map((c) => c.id);

/* ------------------------------------------------------------------ */
/*  METRICS                                                            */
/* ------------------------------------------------------------------ */

export interface Metric {
  id: string;
  label: string;
  /** Short unit shown next to values, e.g. "€K". */
  unit: string;
  /** Which direction counts as the better outcome for a client. */
  better: "higher" | "lower";
  areas: Exclude<ServiceAreaId, "all">[];
  /** One line explaining what the number is, shown under the chart title. */
  note: string;
  /** Where the figure comes from — shown in the sources panel. */
  source: string;
  values: Record<string, number>;
  /** Decimal places when formatting. */
  precision?: number;
  /** Rendered before the number instead of after. */
  prefix?: string;
}

export const metrics: Metric[] = [
  {
    id: "minInvestment",
    label: "Minimum investment",
    unit: "€K",
    better: "lower",
    areas: ["citizenship", "residence"],
    note: "Lowest qualifying threshold across the country's available routes.",
    source: "Programme regulations, July 2026",
    values: { turkiye: 400, portugal: 500, spain: 500, malta: 690, latvia: 250, uae: 550, caribbean: 235 },
  },
  {
    id: "processingDays",
    label: "Processing time",
    unit: "days",
    better: "lower",
    areas: ["citizenship", "residence"],
    note: "Average end-to-end duration from submission to issued status.",
    source: "TEKCE file records, 2024–2026",
    values: { turkiye: 90, portugal: 420, spain: 150, malta: 240, latvia: 120, uae: 30, caribbean: 180 },
  },
  {
    id: "visaFree",
    label: "Visa-free access",
    unit: "countries",
    better: "higher",
    areas: ["citizenship"],
    note: "Destinations reachable visa-free or visa-on-arrival on the resulting passport.",
    source: "Henley Passport Index, 2026",
    values: { turkiye: 118, portugal: 191, spain: 194, malta: 190, latvia: 184, uae: 185, caribbean: 144 },
  },
  {
    id: "presenceDays",
    label: "Presence requirement",
    unit: "days/yr",
    better: "lower",
    areas: ["residence", "citizenship"],
    note: "Minimum physical presence needed each year to maintain status.",
    source: "Programme regulations, July 2026",
    values: { turkiye: 0, portugal: 7, spain: 183, malta: 0, latvia: 1, uae: 0, caribbean: 0 },
  },
  {
    id: "expatShare",
    label: "Expat share of population",
    unit: "%",
    better: "higher",
    areas: ["residence", "familyEducation"],
    note: "How established the international community already is.",
    source: "National statistics offices, 2025",
    values: { turkiye: 4.6, portugal: 7.4, spain: 12.8, malta: 21.3, latvia: 3.9, uae: 88.5, caribbean: 9.2 },
    precision: 1,
  },
  {
    id: "pricePerSqm",
    label: "Prime property price",
    unit: "€/m²",
    better: "lower",
    areas: ["realEstate"],
    note: "Average residential price per square metre in the primary investment district.",
    source: "TEKCE market data, Q2 2026",
    values: { turkiye: 1850, portugal: 4200, spain: 4350, malta: 4800, latvia: 1950, uae: 5100, caribbean: 3400 },
  },
  {
    id: "rentalYield",
    label: "Gross rental yield",
    unit: "%",
    better: "higher",
    areas: ["realEstate"],
    note: "Annual gross rental income as a share of purchase price.",
    source: "TEKCE market data, Q2 2026",
    values: { turkiye: 6.4, portugal: 5.1, spain: 4.8, malta: 4.2, latvia: 5.6, uae: 7.2, caribbean: 4.5 },
    precision: 1,
  },
  {
    id: "propertyGrowth",
    label: "5-year capital growth",
    unit: "%",
    better: "higher",
    areas: ["realEstate"],
    note: "Cumulative change in prime residential values since 2021.",
    source: "TEKCE market data, Q2 2026",
    values: { turkiye: 78, portugal: 42, spain: 31, malta: 24, latvia: 19, uae: 108, caribbean: 22 },
  },
  {
    id: "incomeTax",
    label: "Top personal income tax",
    unit: "%",
    better: "lower",
    areas: ["taxBusiness"],
    note: "Highest marginal rate on personal income for a tax resident.",
    source: "OECD / national tax authorities, 2026",
    values: { turkiye: 40, portugal: 48, spain: 47, malta: 35, latvia: 31, uae: 0, caribbean: 28 },
  },
  {
    id: "corporateTax",
    label: "Corporate tax rate",
    unit: "%",
    better: "lower",
    areas: ["taxBusiness"],
    note: "Headline rate on company profits, before incentives.",
    source: "OECD / national tax authorities, 2026",
    values: { turkiye: 25, portugal: 21, spain: 25, malta: 35, latvia: 20, uae: 9, caribbean: 25 },
  },
  {
    id: "companySetupDays",
    label: "Company formation",
    unit: "days",
    better: "lower",
    areas: ["taxBusiness"],
    note: "Typical time to incorporate and obtain a trading licence.",
    source: "World Bank / TEKCE corporate desk, 2026",
    values: { turkiye: 7, portugal: 5, spain: 13, malta: 10, latvia: 4, uae: 3, caribbean: 14 },
  },
  {
    id: "intlSchools",
    label: "International schools",
    unit: "",
    better: "higher",
    areas: ["familyEducation"],
    note: "Accredited international schools offering a non-national curriculum.",
    source: "ISC Research, 2026",
    values: { turkiye: 185, portugal: 45, spain: 220, malta: 12, latvia: 8, uae: 310, caribbean: 16 },
  },
  {
    id: "healthcareIndex",
    label: "Healthcare quality",
    unit: "/100",
    better: "higher",
    areas: ["familyEducation"],
    note: "Composite index of access, outcomes and infrastructure.",
    source: "WHO / Numbeo composite, 2026",
    values: { turkiye: 69, portugal: 87, spain: 92, malta: 85, latvia: 64, uae: 82, caribbean: 58 },
  },
  {
    id: "costOfLiving",
    label: "Cost of living index",
    unit: "",
    better: "lower",
    areas: ["familyEducation", "residence"],
    note: "Overall basket cost, indexed to New York = 100.",
    source: "Numbeo, Q2 2026",
    values: { turkiye: 24, portugal: 43, spain: 42, malta: 51, latvia: 38, uae: 50, caribbean: 46 },
  },
];

/* ------------------------------------------------------------------ */
/*  TREND SERIES — prime property price index, 2021 = 100              */
/* ------------------------------------------------------------------ */

export const trendYears = ["2021", "2022", "2023", "2024", "2025", "2026"];

export const propertyIndex: Record<string, number[]> = {
  turkiye: [100, 128, 149, 164, 172, 178],
  portugal: [100, 112, 121, 130, 137, 142],
  spain: [100, 107, 114, 120, 126, 131],
  malta: [100, 105, 110, 115, 120, 124],
  latvia: [100, 104, 108, 112, 116, 119],
  uae: [100, 124, 152, 178, 195, 208],
  caribbean: [100, 106, 111, 115, 119, 122],
};

/* ------------------------------------------------------------------ */
/*  COST BREAKDOWN — heatmap matrix                                    */
/* ------------------------------------------------------------------ */

export const costCategories = [
  "Rent",
  "Groceries",
  "Transport",
  "Healthcare",
  "Schooling",
  "Dining",
] as const;

/** Indexed to New York = 100. Lower is cheaper. */
export const costMatrix: Record<string, number[]> = {
  turkiye: [18, 28, 22, 30, 25, 20],
  portugal: [42, 45, 40, 48, 38, 42],
  spain: [38, 43, 42, 50, 40, 40],
  malta: [48, 52, 38, 55, 60, 50],
  latvia: [30, 36, 32, 40, 34, 33],
  uae: [55, 48, 35, 45, 65, 52],
  caribbean: [40, 55, 44, 42, 48, 47],
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

export function metricsForArea(area: ServiceAreaId): Metric[] {
  if (area === "all") return metrics;
  return metrics.filter((m) => m.areas.includes(area as Exclude<ServiceAreaId, "all">));
}

export function formatValue(metric: Metric, value: number): string {
  const digits = metric.precision ?? 0;
  const formatted = value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
  if (metric.prefix) return `${metric.prefix}${formatted}`;
  if (metric.unit === "%") return `${formatted}%`;
  if (!metric.unit) return formatted;
  return `${formatted} ${metric.unit}`;
}

/** The country id with the best value for this metric among `ids`. */
export function bestCountry(metric: Metric, ids: string[]): string | null {
  const scoped = ids.filter((id) => metric.values[id] !== undefined);
  if (scoped.length === 0) return null;
  return scoped.reduce((best, id) =>
    metric.better === "higher"
      ? metric.values[id] > metric.values[best] ? id : best
      : metric.values[id] < metric.values[best] ? id : best
  );
}

/**
 * Every country tied at the best value. Several metrics have ties — four
 * destinations require zero days of presence — and marking only the first
 * would read as a ranking that the data does not support.
 */
export function bestCountries(metric: Metric, ids: string[]): string[] {
  const winner = bestCountry(metric, ids);
  if (!winner) return [];
  const target = metric.values[winner];
  return ids.filter(
    (id) => metric.values[id] !== undefined && metric.values[id] === target
  );
}

/** Rows sorted best → worst, ready for a ranking chart. */
export function rankedRows(metric: Metric, ids: string[]) {
  return ids
    .filter((id) => metric.values[id] !== undefined)
    .map((id) => ({
      id,
      name: countries.find((c) => c.id === id)?.name ?? id,
      value: metric.values[id],
    }))
    .sort((a, b) =>
      metric.better === "higher" ? b.value - a.value : a.value - b.value
    );
}

export const getCountry = (id: string) => countries.find((c) => c.id === id);
