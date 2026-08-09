/**
 * About content - the professional summary plus the education entries that close the
 * Experience ledger.
 *
 * `professionalSummary`, `education` and `furtherEducation` are sourced from the owner's
 * CV ("Maayan Pony - CV"): the About-Me paragraph, the HIT B.Sc. entry (Oct 2022 - present,
 * GPA 95, Electro-Optics & Microelectronics specialization) and the Ein-Kerem High School
 * diploma (2015-2018, GPA 103, with honors).
 *
 * ⚠️ No certificate files exist for either entry yet, so `degreeCertificate` is omitted on
 * both - the ledger then renders the record without a "Preview certificate" trigger rather
 * than opening an empty viewer. Drop a PDF into `public/certificates/` and add the ref to
 * wire it up.
 *
 * ⚠️ No institution logo assets exist in `public/logos/`, so both timeline markers fall back
 * to initials (`HIT`, `EKH`). Drop a licence-cleared logo in and set `institutionLogo` to
 * switch either over.
 *
 * Count stats (courses, technologies, projects, certificates) are absent: the CV states
 * none of them, and nothing in the UI renders them today.
 */

import type { AboutSectionData } from "../types";
import { validateAboutSectionData } from "../validate";
import { profile } from "./profile";

function calculateFullYearsSince(startDate: string, currentDate = new Date()): number {
  const [startYear, startMonth] = startDate.split("-").map(Number);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  if (!startYear || !startMonth) {
    return 0;
  }

  const yearDelta = currentYear - startYear;
  const hasReachedStartMonth = currentMonth >= startMonth;

  return Math.max(0, hasReachedStartMonth ? yearDelta : yearDelta - 1);
}

const yearsExperienceCountLabel = String(
  calculateFullYearsSince(profile.yearsExperienceStartDate),
);

const aboutData = {
  professionalSummary:
    "I'm a fourth-year Electrical & Electronics Engineering B.Sc. student at HIT, " +
    "specializing in Electro-Optics and Microelectronics.\n\n" +
    "In the Electro-Optics Laboratory I design and implement optical setups that integrate " +
    "electronics and photonics, run experiments with lasers, sensors and signal acquisition " +
    "systems, and process the resulting data in Matlab and Python.\n\n" +
    "I'm motivated to apply what I've learned in a practical environment, contribute to " +
    "innovative projects, and gain hands-on experience in the industry.",
  yearsExperienceStartDate: profile.yearsExperienceStartDate,
  stats: {
    yearsExperienceCountLabel,
  },
  mainFields: profile.mainFields,
  education: {
    dateRange: "Oct 2022 - present",
    degree: "B.Sc. Electrical & Electronics Engineering",
    institution: "Holon Institute of Technology (HIT)",
    honor: "GPA 95",
    summary:
      "Specializing in Electro-Optics & Microelectronics. Coursework includes Semiconductor " +
      "Devices (100), Microelectronics Technologies (99), Control Systems (98), " +
      "Electromagnetic Fields (94), Digital Signal Processing, Linear Circuits, " +
      "Communication Systems and the Microcontrollers Lab.",
  },
  furtherEducation: [
    {
      dateRange: "2015 - 2018",
      degree: "High School Diploma, with honors",
      institution: "Ein-Kerem High School",
      honor: "GPA 103",
      summary:
        "Extended studies in Mathematics, English, Physics, Biology and Agriculture.",
    },
  ],
} as const;

export const about: AboutSectionData = validateAboutSectionData(aboutData);
