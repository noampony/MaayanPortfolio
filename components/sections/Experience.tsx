import { ExperienceIntro } from "@/components/sections/ExperienceIntro";
import { SectionBackground } from "@/components/layout/SectionBackground";
import { ExperienceLedger } from "@/components/ui/ExperienceLedger";
import { about } from "@/lib/content/data/about";
import { experiences } from "@/lib/content/data/experience";
import { buildExperienceLedger, ledgerStartYear } from "@/lib/content/experienceLedger";
import { filterConfidentialityReviewed } from "@/lib/content/loaders";
import type { Experience as ExperienceModel } from "@/lib/content/types";

/**
 * Experience section - an editorial ledger of professional roles down a single rail:
 * newest role at the top, one hairline-separated record per role, then the education
 * entries (the degree and the bootcamp alongside it) closing it out at the bottom. Entry
 * order and flattening live in `buildExperienceLedger`; the rail, markers and reveals
 * live in `ExperienceLedger`.
 *
 * Confidentiality gating (§15.4, tasks/README Rule 9): only entries with
 * `confidentialityReviewed: true` are ever rendered; the gate runs here so an
 * unreviewed work entry can never reach the DOM regardless of ordering.
 *
 * The section exposes the `#experience` anchor (spec §5.3), which the primary
 * navbar links to and highlights via scroll-spy (see `lib/navigation.ts` and
 * `lib/hooks/useActiveSection.ts`).
 *
 * This stays a server component so the ledger content is rendered into the initial
 * HTML (available without client JS, good for SEO/AT) and the ongoing role's
 * duration is computed once at build time here, then handed to the client
 * `ExperienceLedger` - avoiding a runtime clock dependency and any hydration
 * mismatch. Every record ships its full detail visible, so the section is complete
 * without JS (§7.5).
 */

const ONGOING_END_SORT_KEY = "9999-99";

/** Sort key for an entry's end; an ongoing role sorts to the top. */
function endSortKey(entry: ExperienceModel): string {
  if (entry.endDate === "Present") {
    return ONGOING_END_SORT_KEY;
  }
  return entry.endDate ?? entry.startDate;
}

/** Reverse-chronological: current / most-recently-ended first, then by start. */
function byMostRecent(a: ExperienceModel, b: ExperienceModel): number {
  const endComparison = endSortKey(b).localeCompare(endSortKey(a));
  if (endComparison !== 0) {
    return endComparison;
  }
  return b.startDate.localeCompare(a.startDate);
}

/** Whole months between a start year-month and now (build time for static pages). */
function monthsElapsedSince(start: string, now = new Date()): number {
  const [startYear, startMonth] = start.split("-").map(Number);
  if (!startYear || !startMonth) {
    return 0;
  }
  const months = (now.getFullYear() - startYear) * 12 + (now.getMonth() + 1 - startMonth);
  return Math.max(0, months);
}

/** Human-readable span (e.g. `3 yrs 8 mos`) from a whole-month count. */
function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];
  if (years > 0) {
    parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  }
  if (months > 0) {
    parts.push(`${months} mo${months === 1 ? "" : "s"}`);
  }
  return parts.length > 0 ? parts.join(" ") : "1 mo";
}

/**
 * Resolve the duration label shown beside an entry's dates. Prefer the
 * owner-provided label; otherwise compute it for an ongoing role. Completed roles
 * with no provided label simply show their date range - no value is invented.
 */
function resolveDuration(entry: ExperienceModel): string | null {
  if (entry.durationLabel) {
    return entry.durationLabel;
  }
  if (entry.endDate === "Present") {
    return formatDuration(monthsElapsedSince(entry.startDate));
  }
  return null;
}

export function Experience() {
  const reviewed = filterConfidentialityReviewed(experiences);
  const entries = [...reviewed].sort(byMostRecent);

  // No reviewed entries → render nothing rather than an empty section shell.
  if (entries.length === 0) {
    return null;
  }

  // Resolve each entry's duration at build time (avoids a client clock dependency),
  // then flatten to the ledger: the roles, then the education entries at the bottom.
  const resolved = entries.map((entry) => ({
    experience: entry,
    duration: resolveDuration(entry),
  }));
  const ledger = buildExperienceLedger(resolved, [
    about.education,
    ...(about.furtherEducation ?? []),
  ]);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="relative isolate overflow-hidden bg-bg-base py-16 lg:py-24"
    >
      <SectionBackground />

      <div className="site-shell relative z-10">
        <ExperienceIntro />

        <ExperienceLedger entries={ledger} startYear={ledgerStartYear(ledger)} />
      </div>
    </section>
  );
}
