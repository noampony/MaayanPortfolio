/**
 * Volunteering & Community content - the cards shown in the homepage grid.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV" → Volunteering). One card per entry,
 * ordered newest-first via `displayOrder`; the grid consumes the array directly. The
 * data is intentionally presentation-agnostic - no layout or styling here.
 *
 * Every card restates what the CV already says publicly. No participant names, no
 * institution addresses, no numbers the CV does not state - these programmes involve
 * minors and vulnerable people, so nothing identifying is added and no impact figure is
 * invented. `confidentialityReviewed: true` records that check.
 *
 * `logos` is the owner-supplied partner/organization logo(s) for an entry (served from
 * `/public/images/volunteering/`); a card with no logo falls back to initials in the UI.
 *
 * `period` is a display-only label carrying the dates the descriptions used to state in
 * prose. The start and end months are owner-supplied (the CV states bare years), so no
 * month here is inferred. The descriptions were trimmed of those dates when the chip took
 * them over; the facts are unchanged, they just moved out of the sentence.
 *
 * `durationLabel` is never authored - it is derived from `period` below, so the span and
 * the dates next to it can never disagree.
 */

import type { Impact } from "../types";
import { formatDuration, monthsBetween } from "../duration";
import { validateImpactList } from "../validate";

const impactData = [
  {
    title: "“Babushka” Initiative",
    description:
      "Taking part in an educational-technological confidence-building project for girls from minority communities, run with Elbit and the “Shavot” Non-Profit organization.",
    impactBullets: [
      "Built around education, not one-off exposure",
      "Opening engineering and technology up to girls who rarely see it",
      "Run together with an industry partner and a Non-Profit organization",
    ],
    period: "Oct 2025 - Jul 2026",
    logos: [
      { src: "/images/volunteering/elbit.png", alt: "Elbit Systems", width: 480, height: 167 },
      { src: "/images/volunteering/shavot.png", alt: "Shavot", width: 480, height: 479 },
    ],
    displayOrder: 1,
    confidentialityReviewed: true,
  },
  {
    title: "Perach Mentorship Program",
    description: "Mentoring and academic support for youth in underserved communities.",
    impactBullets: [
      "One-to-one mentoring alongside my own degree",
      "Academic support where it is hardest to come by",
      "An ongoing commitment, not a one-off",
    ],
    period: "Oct 2025 - Jul 2026",
    logos: [{ src: "/images/volunteering/perach.jpg", alt: "Perach", width: 480, height: 303 }],
    displayOrder: 2,
    confidentialityReviewed: true,
  },
  {
    title: "I-School Program",
    description:
      "Mentored and tutored an elementary school student in a socio-economically peripheral community, across a full school year.",
    impactBullets: [
      "Weekly one-to-one tutoring",
      "Support for a student in a peripheral community",
      "A mentoring relationship, not just homework help",
    ],
    period: "Sep 2025 - Jul 2026",
    logos: [
      { src: "/images/volunteering/ischool.jpg", alt: "I-School Program", width: 480, height: 480 },
    ],
    displayOrder: 3,
    confidentialityReviewed: true,
  },
  {
    title: "National Agricultural Harvest Scholarship",
    // "team leader" carries a `**bold**` marker - rendered as `<strong>` by ImpactCard via
    // `withBoldMarkers` (see lib/utils.ts).
    description:
      "Volunteered in the national agricultural harvest effort, serving as a **team leader**.",
    impactBullets: [
      "Led a volunteer team in the field",
      "Answered a national call for agricultural help",
      "Coordination and responsibility under real deadlines",
    ],
    period: "Nov 2024 - Jan 2025",
    logos: [
      {
        src: "/images/volunteering/ministry-of-agriculture.svg",
        alt: "Ministry of Agriculture and Food Security",
        width: 1000,
        height: 900,
      },
    ],
    displayOrder: 4,
    confidentialityReviewed: true,
  },
  {
    title: "Holon Elderly Club",
    description:
      "Provided assistance and companionship to elderly members of the Holon community.",
    impactBullets: [
      "Regular companionship for people at risk of isolation",
      "Practical day-to-day assistance",
      "Time given consistently, week after week",
    ],
    period: "Sep 2023 - Jul 2024",
    logos: [
      {
        src: "/images/volunteering/holon-elderly-club.webp",
        alt: "Holon Elderly Club",
        width: 1280,
        height: 959,
      },
    ],
    displayOrder: 5,
    confidentialityReviewed: true,
  },
] as const;

const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * `Oct 2025` → `2025-10`, the year-month shape {@link monthsBetween} counts in. A bare
 * year has no month to convert, so it returns nothing rather than guessing January.
 */
function toYearMonth(point: string): string | undefined {
  const [month, year] = point.split(" ");
  if (year === undefined) {
    return undefined;
  }
  const monthIndex = MONTH_NAMES.indexOf(month);
  return monthIndex < 0 ? undefined : `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
}

/**
 * The span a `period` label covers, e.g. `Oct 2025 - Jul 2026` → `10 months`. Counted the
 * same way the Experience ledger counts; spelled out in full because the card's chip has
 * the room the ledger's meta row does not.
 *
 * Returns nothing when the label gives nothing to measure: a single point in time, an end
 * of `Present` (no fixed end, and a client-rendered card must not read a clock), or an end
 * the CV states only as a year. Better no chip than an invented one.
 */
function durationFromPeriod(period: string): string | undefined {
  const [start, end] = period.split(" - ");
  if (end === undefined) {
    return undefined;
  }
  const startYearMonth = toYearMonth(start);
  const endYearMonth = toYearMonth(end);
  if (!startYearMonth || !endYearMonth) {
    return undefined;
  }
  return formatDuration(monthsBetween(startYearMonth, endYearMonth), "long");
}

/** Validated Volunteering & Community cards, newest first. */
export const impacts: Impact[] = validateImpactList(
  impactData.map((card) => ({ ...card, durationLabel: durationFromPeriod(card.period) })),
);
