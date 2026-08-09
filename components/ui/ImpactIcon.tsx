/**
 * Decorative line icons for Volunteering & Community entries that have no partner logo.
 *
 * Two of the CV's volunteering entries are not run by a branded organization, so there is
 * no mark to show. Rather than leaving those cards with a weak initials chip beside four
 * real logos, each gets a stroke icon rendered in the same `.impact-card-lockup` frame - so
 * all five cards read as one set.
 *
 * These are purely decorative (`aria-hidden`): they illustrate, they do not state a fact.
 * The card's title and description carry all the meaning. Keying the map by exact title
 * mirrors `PROJECT_BACKGROUNDS` in components/sections/ProjectsPreview.tsx - the repo's
 * idiom for presentation keyed by content name - and keeps lib/content/data/impact.ts
 * presentation-free.
 *
 * Paths are hand-authored in the Material Design Icons (Apache-2.0) house style already
 * sanctioned in lib/content/skill-icons.ts: 24x24 viewBox, stroked rather than filled,
 * round caps and joins. No new dependency.
 */

import type { ReactElement } from "react";

/** Shared geometry for every icon, so the set stays optically consistent. */
const STROKE_PROPS = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

/**
 * Wheat sheaf - the national agricultural harvest. A central stalk with three pairs of
 * grain leaves and a bound base.
 */
function WheatIcon(): ReactElement {
  return (
    <svg
      className="impact-card-lockup-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...STROKE_PROPS}
    >
      <path d="M12 21V8" />
      <path d="M12 8c0-2 1.2-3.6 2.8-4.4C15.4 5.4 14.6 7.6 12 8Z" />
      <path d="M12 8c0-2-1.2-3.6-2.8-4.4C8.6 5.4 9.4 7.6 12 8Z" />
      <path d="M12 13c0-2 1.2-3.6 2.8-4.4C15.4 10.4 14.6 12.6 12 13Z" />
      <path d="M12 13c0-2-1.2-3.6-2.8-4.4C8.6 10.4 9.4 12.6 12 13Z" />
      <path d="M12 18c0-2 1.2-3.6 2.8-4.4C15.4 15.4 14.6 17.6 12 18Z" />
      <path d="M12 18c0-2-1.2-3.6-2.8-4.4C8.6 15.4 9.4 17.6 12 18Z" />
    </svg>
  );
}

/**
 * Cupped hands cradling a heart - companionship for elderly community members. Two open
 * palms below, a heart resting above them.
 */
function HandsHeartIcon(): ReactElement {
  return (
    <svg
      className="impact-card-lockup-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...STROKE_PROPS}
    >
      <path d="M12 10.9 10.9 9.86a1.9 1.9 0 0 1 2.68-2.68l.42.42.42-.42a1.9 1.9 0 0 1 2.68 2.68L12 10.9Z" />
      <path d="M4 12.5v4a4 4 0 0 0 1.5 3.12L8 21.5" />
      <path d="M20 12.5v4a4 4 0 0 1-1.5 3.12L16 21.5" />
      <path d="M4 12.5a1.6 1.6 0 0 1 3.2 0v2.2" />
      <path d="M20 12.5a1.6 1.6 0 0 0-3.2 0v2.2" />
    </svg>
  );
}

/**
 * Decorative icons by entry title. Entries with a real partner logo are absent - the logo
 * is always preferred over an illustration.
 */
const IMPACT_ICONS: Record<string, () => ReactElement> = {
  "National Agricultural Harvest Scholarship": WheatIcon,
  "Holon Elderly Club": HandsHeartIcon,
};

/**
 * The decorative icon for an entry, or `null` when none is mapped - callers fall back to
 * the initials marker so an unmapped, logo-less entry still renders something.
 */
export function ImpactIcon({ title }: { title: string }): ReactElement | null {
  const Icon = IMPACT_ICONS[title];
  return Icon ? <Icon /> : null;
}
