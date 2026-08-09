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
 * `period` is a display-only label restating the years the description already gives -
 * the CV states bare years, so no month is inferred and nothing new is claimed.
 */

import type { Impact } from "../types";
import { validateImpactList } from "../validate";

const impactData = [
  {
    title: "Perach Mentorship Program",
    description:
      "Mentoring and academic support for youth in underserved communities, from 2025 to today.",
    impactBullets: [
      "One-to-one mentoring alongside my own degree",
      "Academic support where it is hardest to come by",
      "An ongoing commitment, not a one-off",
    ],
    period: "2025 - Present",
    logos: [{ src: "/images/volunteering/perach.jpg", alt: "Perach" }],
    displayOrder: 1,
    confidentialityReviewed: true,
  },
  {
    title: "“Babushka” Initiative",
    description:
      "Taking part in an educational-technological empowerment project for girls from minority communities, run with Elbit and the “Shavot” NGO. Ongoing since 2025.",
    impactBullets: [
      "Opening engineering and technology up to girls who rarely see it",
      "Built around education, not one-off exposure",
      "Run together with an industry partner and an NGO",
    ],
    period: "2025 - Present",
    logos: [
      { src: "/images/volunteering/elbit.png", alt: "Elbit Systems" },
      { src: "/images/volunteering/shavot.png", alt: "Shavot" },
    ],
    displayOrder: 2,
    confidentialityReviewed: true,
  },
  {
    title: "I-School Program",
    description:
      "Mentored and tutored an elementary school student in a socio-economically peripheral community over the 2024-2025 school year.",
    impactBullets: [
      "Weekly one-to-one tutoring across a full school year",
      "Support for a student in a peripheral community",
      "A mentoring relationship, not just homework help",
    ],
    period: "2024 - 2025",
    logos: [{ src: "/images/volunteering/ischool.jpg", alt: "I-School Program" }],
    displayOrder: 3,
    confidentialityReviewed: true,
  },
  {
    title: "National Agricultural Harvest Scholarship",
    description:
      "Volunteered in the 2024 national agricultural harvest effort, serving as a team leader.",
    impactBullets: [
      "Led a volunteer team in the field",
      "Answered a national call for agricultural help",
      "Coordination and responsibility under real deadlines",
    ],
    period: "2024",
    displayOrder: 4,
    confidentialityReviewed: true,
  },
  {
    title: "Holon Elderly Club",
    description:
      "Provided assistance and companionship to elderly members of the Holon community during 2023.",
    impactBullets: [
      "Regular companionship for people at risk of isolation",
      "Practical day-to-day assistance",
      "Time given consistently, week after week",
    ],
    period: "2023",
    displayOrder: 5,
    confidentialityReviewed: true,
  },
] as const;

/** Validated Volunteering & Community cards, newest first. */
export const impacts: Impact[] = validateImpactList(impactData);
