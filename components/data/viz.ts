/**
 * Chart tokens for TEKCE Data.
 *
 * The page uses exactly two colour jobs:
 *   · emphasis  — accent for the best value in a metric, neutral grey for the rest
 *   · sequential — one cyan ramp, light → dark, for the heatmap's magnitude
 *
 * There is deliberately no categorical palette: every chart on the page either
 * shows one series or encodes magnitude, so identity colours are never needed
 * and the page stays on the site's neutral-plus-one-accent language.
 *
 * The accent sits at 2.36:1 on a white surface, below the 3:1 mark threshold.
 * The relief rule applies and is satisfied on every chart: values are printed
 * as visible labels and the full dataset is reachable in the table view.
 */

export const VIZ = {
  accent: "#00b7d0",
  /** Darker accent for text and small marks that need to clear 3:1. */
  accentInk: "#00778a",
  neutral: "#d4d4d4",
  neutralStrong: "#a3a3a3",
  grid: "#ececec",
  axis: "#9a9a9a",
  surface: "#ffffff",
} as const;

/**
 * Sequential cyan ramp, light → dark. Validated: monotone lightness,
 * adjacent ΔL ≥ 0.06, single hue (4° spread). The lightest step is allowed
 * to recede toward the surface because this is a magnitude encoding — every
 * cell also carries a printed value.
 */
export const SEQUENTIAL = [
  "#d6f1f7",
  "#95dced",
  "#4ac8dc",
  "#00a8c0",
  "#00778a",
] as const;

/** Picks a ramp step for `value` within [min, max]. */
export function rampStep(value: number, min: number, max: number): string {
  if (max === min) return SEQUENTIAL[2];
  const t = (value - min) / (max - min);
  const index = Math.min(
    SEQUENTIAL.length - 1,
    Math.max(0, Math.round(t * (SEQUENTIAL.length - 1)))
  );
  return SEQUENTIAL[index];
}

/** Cells on the two darkest steps need light text to stay readable. */
export function rampTextColor(step: string): string {
  return step === SEQUENTIAL[3] || step === SEQUENTIAL[4] ? "#ffffff" : "#0a0a0a";
}
