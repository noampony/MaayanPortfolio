/**
 * Profile content - used by Hero, the site logo/footer wordmark, and the JSON-LD.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV"): name, the About-Me summary, and the
 * main fields (derived from the CV's About Me + Technical Skills lists).
 *
 * `title` is `Electrical Engineer` - owner-directed framing that moves away from the CV's
 * own "student" wording (the owner no longer wants to be presented as a student). The
 * degree itself is untouched: it still reads `B.Sc. Electrical & Electronics Engineering`
 * wherever the degree title is shown (see `about.ts`).
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
  title: "Electrical Engineer",
  oneLineSummary:
    "An Electrical Engineer specializing in Electro-Optics and Microelectronics",
  // Two lines, each kept short: the Hero renders them unwrapped at xl.
  heroText:
    "Specializing in Electro-Optics and Microelectronics at HIT.\nHands-on laboratory, research, and circuit-building experience.",
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
