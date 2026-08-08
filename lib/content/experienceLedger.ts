/**
 * Experience ledger model - the flat, reverse-chronological entry list the Experience
 * timeline renders.
 *
 * The section reads as an editorial ledger down a single rail: one entry per role, newest
 * at the top, then the education entries closing it out at the bottom - the degree and any
 * further qualification alongside it, newest first (sourced from the public About section,
 * `about.education` / `about.furtherEducation`, not from the experience data).
 *
 * A promotion (`Experience.previousRoles`) is FLATTENED into its own entry directly below
 * the role it led to, sharing the organisation's rail marker. On a ledger, consecutive
 * entries under the same marker read as a progression - the same convention the source
 * design and LinkedIn use - whereas the previous git-graph layout had to fold them into
 * one node so a promotion didn't look like two separate jobs.
 *
 * This module is pure and server-safe (no React, no `Date`). The server component
 * (`Experience.tsx`) does confidentiality filtering and build-time duration resolution
 * *before* calling `buildExperienceLedger`, so this never gates content and never depends
 * on a runtime clock.
 */

import type {
  AboutEducation,
  AssetReference,
  EducationCertificateRef,
  Experience,
  ExperienceEndDate,
} from "./types";

/** A duration-resolved experience handed in by the server component. */
export type ResolvedExperience = {
  experience: Experience;
  /** Build-time duration label (e.g. `3 yrs 8 mos`), or null to omit. */
  duration: string | null;
};

type LedgerEntryBase = {
  /** Stable id for React keys + aria wiring. */
  id: string;
  /** Initials drawn in the rail marker when there is no logo to draw instead. */
  markerLabel: string;
  /** Organisation / institution logo for the rail marker (served from `/public`). */
  markerLogo?: AssetReference;
};

export type LedgerRoleEntry = LedgerEntryBase & {
  kind: "role";
  organization: string;
  organizationType?: string;
  role: string;
  employmentType?: string;
  startDate: string;
  endDate?: ExperienceEndDate;
  duration: string | null;
  description: string;
  technologies?: readonly string[];
  teamSize?: string;
  link?: string;
  certificate?: EducationCertificateRef;
  isCurrent: boolean;
};

export type LedgerEducationEntry = LedgerEntryBase & {
  kind: "education";
  education: AboutEducation;
};

export type LedgerEntry = LedgerRoleEntry | LedgerEducationEntry;

/** Words that carry no signal in an initials marker ("The Academic College of ..." → "AC"). */
const MARKER_STOP_WORDS = new Set(["a", "and", "at", "for", "of", "the"]);

/**
 * Ticker-style initials for a rail marker - the first letters of up to three significant
 * words, e.g. `Kiloma Advanced Solutions` → `KAS`. Only used when the entry has no logo.
 */
export function organizationMarker(name: string): string {
  const initials = name
    .split(/[\s\---/]+/)
    .filter((word) => word.length > 0 && !MARKER_STOP_WORDS.has(word.toLowerCase()))
    .map((word) => word.slice(0, 1).toUpperCase())
    .join("");
  return initials.slice(0, 3) || name.slice(0, 2).toUpperCase();
}

function isOngoing(endDate?: ExperienceEndDate): boolean {
  return endDate === "Present";
}

/**
 * Build the ledger entries from the (already filtered + duration-resolved) experiences
 * and the education entries.
 *
 * Roles come in the order handed in - the server passes most-recent-first - with each
 * experience immediately followed by its earlier roles at the same organisation. The
 * education entries are appended last, sorted newest-first by their own start year, so
 * they read as the foot of the story rather than being interleaved with the roles. Any
 * number of entries renders; there is no required shape.
 */
export function buildExperienceLedger(
  resolved: readonly ResolvedExperience[],
  education: readonly AboutEducation[],
): LedgerEntry[] {
  const entries: LedgerEntry[] = [];

  for (const { experience, duration } of resolved) {
    const marker = {
      markerLabel: organizationMarker(experience.organization),
      markerLogo: experience.organizationLogo,
    };

    entries.push({
      kind: "role",
      id: `${experience.organization}-${experience.role}-${experience.startDate}`,
      ...marker,
      organization: experience.organization,
      organizationType: experience.organizationType,
      role: experience.role,
      employmentType: experience.employmentType,
      startDate: experience.startDate,
      endDate: experience.endDate,
      duration,
      description: experience.description,
      technologies: experience.technologies,
      teamSize: experience.teamSize,
      link: experience.link,
      certificate: experience.certificate,
      isCurrent: isOngoing(experience.endDate),
    });

    // Earlier roles at the same organisation, most-recent-first (as stored). They inherit
    // the organisation and its marker, but not its link/certificate - those belong to the
    // organisation entry above and would otherwise be repeated on every step.
    for (const previous of experience.previousRoles ?? []) {
      entries.push({
        kind: "role",
        id: `${experience.organization}-${previous.role}-${previous.startDate}`,
        ...marker,
        organization: experience.organization,
        organizationType: experience.organizationType,
        role: previous.role,
        startDate: previous.startDate,
        endDate: previous.endDate,
        duration: previous.durationLabel ?? null,
        description: previous.description,
        technologies: previous.technologies,
        isCurrent: isOngoing(previous.endDate),
      });
    }
  }

  const educationNewestFirst = [...education].sort(
    (a, b) => (firstYear(b.dateRange) ?? 0) - (firstYear(a.dateRange) ?? 0),
  );
  for (const entry of educationNewestFirst) {
    entries.push({
      kind: "education",
      id: `education-${entry.institution}-${entry.degree}`,
      markerLabel: organizationMarker(entry.institution),
      markerLogo: entry.institutionLogo,
      education: entry,
    });
  }

  return entries;
}

/** First 4-digit year in a free-form date string (`2019 - 2023` → 2019). */
function firstYear(value: string): number | null {
  const match = /\d{4}/.exec(value);
  return match ? Number(match[0]) : null;
}

/**
 * The earliest year anywhere in the ledger - the year the timeline starts, used for the
 * closing "began ..." line. Null when no entry carries a parseable year.
 */
export function ledgerStartYear(entries: readonly LedgerEntry[]): string | null {
  const years = entries
    .map((entry) =>
      firstYear(entry.kind === "role" ? entry.startDate : entry.education.dateRange),
    )
    .filter((year): year is number => year !== null);
  return years.length > 0 ? String(Math.min(...years)) : null;
}
