/**
 * Profile content - used by Hero, the site logo/footer wordmark, and the JSON-LD.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV"): name, the About-Me summary, and the
 * main fields (derived from the CV's About Me + Technical Skills lists).
 *
 * `title` is `Electrical & Electronics Engineering Student` - the CV's own framing
 * ("Fourth-year Electrical & Electronics Engineering B.Sc. student"). The hero body copy
 * below keeps the CV's About-Me wording.
 *
 * `yearsExperienceStartDate` anchors to `2024-01`, the start of the Electro-Optics
 * Laboratory research assistantship. The CV gives the year only ("2024 - present"), so the
 * month is the earliest reading consistent with it. Nothing in the UI renders a
 * "years of experience" figure today - the Hero tags show GPA, the lab role and the degree -
 * but the field stays the single anchor should a derived figure ever be shown.
 *
 * Count labels (courses, technologies, projects, certificates) are omitted: none of them
 * are stated in this CV, and the validator drops absent optionals rather than inventing
 * numbers.
 */

import type { Profile } from "../types";
import { validateProfile } from "../validate";

const profileData = {
  name: "Maayan Pony",
  title: "Electrical & Electronics Engineering Student",
  oneLineSummary:
    "A fourth-year Electrical & Electronics Engineering student specializing in Electro-Optics and Microelectronics",
  // Two lines, each kept short: the Hero renders them unwrapped at xl.
  heroText:
    "Specializing in Electro-Optics and Microelectronics at HIT.\nHands-on laboratory, research, and data-analysis experience.",
  location: "Israel",
  profileImage: "/profile.png",
  yearsExperienceStartDate: "2024-01",
  mainFields: [
    "Electro-Optics",
    "Microelectronics",
    "Semiconductor Devices",
    "Signal Processing",
    "Control Systems",
    "Communication Systems",
    "Laboratory Research",
    "Embedded Systems",
    "Data Analysis",
  ],
} as const;

export const profile: Profile = validateProfile(profileData);
