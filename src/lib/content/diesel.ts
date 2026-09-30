/** EIA weekly U.S. on-highway diesel, dollars per gallon. Verified survey weeks only. */
export const dieselWeeks = [
  { week: "2026-08-03", label: "Aug 3", price: 5.348 },
  { week: "2026-08-10", label: "Aug 10", price: 5.257 },
  { week: "2026-08-17", label: "Aug 17", price: 5.454 },
  { week: "2026-08-24", label: "Aug 24", price: 5.652 },
  { week: "2026-08-31", label: "Aug 31", price: 5.599 },
  { week: "2026-09-07", label: "Sep 7", price: 5.967 },
  { week: "2026-09-14", label: "Sep 14", price: 6.285 },
  { week: "2026-09-21", label: "Sep 21", price: 6.529 },
] as const;

export const latestDiesel = dieselWeeks[dieselWeeks.length - 1]!;

export type DieselTick = { week: string; label: string; price: number };

export function chartWeeks(tick: DieselTick | null): DieselTick[] {
  const base = dieselWeeks.map((week) => ({ week: week.week, label: week.label, price: week.price }));
  if (!tick || tick.week <= latestDiesel.week) return base;
  if (base.some((week) => week.week === tick.week)) return base;
  return [...base, tick];
}

export const dieselYearAgo = 3.749;

export const dieselRegions = [
  { region: "United States", price: 6.529, week: 0.244, year: 2.78 },
  { region: "East Coast", price: 6.268, week: 0.11, year: 2.523 },
  { region: "New England", price: 6.517, week: 0.315, year: 2.555 },
  { region: "Central Atlantic", price: 6.546, week: 0.234, year: 2.638 },
  { region: "Lower Atlantic", price: 6.139, week: 0.043, year: 2.475 },
  { region: "Midwest", price: 6.68, week: 0.43, year: 2.949 },
  { region: "Gulf Coast", price: 6.177, week: 0.15, year: 2.777 },
  { region: "Rocky Mountain", price: 6.34, week: 0.274, year: 2.593 },
  { region: "West Coast", price: 7.456, week: 0.206, year: 2.932 },
  { region: "West Coast less California", price: 6.791, week: 0.225, year: 2.668 },
  { region: "California", price: 8.246, week: 0.207, year: 3.261 },
] as const;

export const DOE_INDEX_NOTE =
  "U.S. Energy Information Administration, weekly retail on-highway diesel, week of September 21, 2026. The next weekly release was scheduled for September 29, 2026. A daily pump average (such as AAA) is a different survey and will not match this number.";
