/**
 * Experience content - used by the Experience ledger.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV" → Experience). Published because the CV
 * is the owner's own outward-facing document and the owner asked for its content to go on
 * the site; nothing is added beyond what the CV already states.
 *
 * ⚠️ Dates. The CV gives years only ("2024 - present") with no months, so each entry is
 * anchored at year granularity: January for a start, December for an end. Confirm the exact
 * months before publishing.
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
    endDate: "Present",
    technologies: [
      "Matlab",
      "Python",
      "Optical Setups",
      "Lasers",
      "Sensors",
      "Signal Acquisition",
      "Data Analysis",
    ],
    description:
      "I design and implement optical setups that integrate electronics and photonics, run experiments with lasers, sensors and signal acquisition systems, and process and analyze the resulting experimental data using Matlab and Python.",
    confidentialityReviewed: true,
  },
] as const;

export const experiences: Experience[] = validateExperienceList(experienceData);
