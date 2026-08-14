/**
 * Date-span helpers shared by the sections that show "how long" next to a date range -
 * the Experience ledger and the Volunteering cards.
 *
 * Kept in one place so both sections speak the same vocabulary: the same month counting
 * and the same `3 yrs 8 mos` shorthand. Nothing here formats a date for display; callers
 * own their own labels.
 */

/**
 * Whole months between two year-months, counting both the first and the last month - the
 * way LinkedIn counts, so the label matches what the same dates show there (Jan 2024 -
 * Jul 2026 is `2 yrs 7 mos`, not 6).
 *
 * `end` defaults to now - which is build time for static pages, so an ongoing role's span
 * is baked in at build rather than read off a runtime clock.
 */
export function monthsBetween(start: string, end?: string, now = new Date()): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  if (!startYear || !startMonth) {
    return 0;
  }
  const [endYear, endMonth] = end
    ? end.split("-").map(Number)
    : [now.getFullYear(), now.getMonth() + 1];
  if (!endYear || !endMonth) {
    return 0;
  }
  const months = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  return Math.max(1, months);
}

/**
 * How the unit is written out. `short` (`3 yrs 8 mos`) suits the Experience ledger, where
 * the span sits in a tight meta row beside the dates; `long` (`3 years 8 months`) suits a
 * label with room to spell itself out.
 */
export type DurationStyle = "short" | "long";

const UNITS: Record<DurationStyle, { year: string; month: string }> = {
  short: { year: "yr", month: "mo" },
  long: { year: "year", month: "month" },
};

/** Human-readable span (e.g. `3 yrs 8 mos`) from a whole-month count. */
export function formatDuration(totalMonths: number, style: DurationStyle = "short"): string {
  const unit = UNITS[style];
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} ${unit.year}${years === 1 ? "" : "s"}`);
  }
  if (months > 0) {
    parts.push(`${months} ${unit.month}${months === 1 ? "" : "s"}`);
  }
  return parts.length > 0 ? parts.join(" ") : `1 ${unit.month}`;
}
