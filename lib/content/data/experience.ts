/**
 * Experience content - used by the Experience ledger.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV" → Experience). Published because the CV
 * is the owner's own outward-facing document and the owner asked for its content to go on
 * the site; nothing is added beyond what the CV already states.
 *
 * ⚠️ Dates. The CV gives years only ("2024 - present") with no months, so a start is anchored
 * at January and an end at December unless the owner gave the exact month. The research
 * assistantship's July 2026 end is owner-given, not anchored.
 */

import type { Experience } from "../types";
import { validateExperienceList } from "../validate";

/**
 * Experience entries - stored current-role-first (reverse chronological);
 * final ordering is the ledger's concern.
 */
const experienceData = [
  {
    organization: "Holon Institute of Technology (HIT)",
    organizationLogo: "/logos/hit.jpg",
    organizationType: "Electro-Optics Laboratory",
    role: "Research Assistant",
    startDate: "2024-01",
    // Owner-confirmed end: the role finished in July 2026. Not "Present" any more, so the
    // ledger drops the "Current" badge for this entry.
    endDate: "2026-07",
    technologies: [
      "Matlab",
      "Python",
      "Optical Setups",
      "Lasers",
      "Sensors",
      "Data Analysis",
    ],
    // Past tense: the role ended in July 2026.
    description:
      "I designed and implemented optical setups that integrate electronics and photonics, ran experiments with lasers and sensors, and processed and analyzed the resulting experimental data using Matlab and Python.",
    confidentialityReviewed: true,
  },
] as const;

export const experiences: Experience[] = validateExperienceList(experienceData);
