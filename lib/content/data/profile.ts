/**
 * Profile content (spec §8.1, §8.2, §11.1) - used by Hero, About, and Contact.
 *
 * Sourced from the owner's CV ("Shani Penkar - CV"): name, the About-Me summary, and the
 * main fields (derived from the CV's About Me + Skills lists).
 *
 * `title` is `Lead Full Stack Developer` - the owner's current role per the Experience
 * timeline - rather than the CV header's `Full Stack Developer`. The hero body copy below
 * keeps the CV's own About-Me wording verbatim.
 *
 * TBD fields (logo, shortTagline, projectsCountLabel, certificatesCountLabel,
 * city) are intentionally omitted.
 *
 * ⚠️ `yearsExperienceStartDate` - the CV states the current role as "2023-Present"
 * with no month, so the year is anchored to the start of 2023 (the earliest reading
 * consistent with the CV). Confirm the real start month with the owner; it changes
 * the derived "Years of Experience" figure in the Hero.
 *
 * ⚠️ `technologiesCountLabel` / `coursesCountLabel` are NOT from this CV and are
 * left at their previous values (the validator pins them, and nothing renders them
 * today - the Hero derives its course count from `learning-paths.ts`).
 */

import type { Profile } from "../types";
import { validateProfile } from "../validate";

const profileData = {
  name: "Shani Penkar",
  title: "Lead Full Stack Developer",
  oneLineSummary: "A passionate, experienced full stack developer",
  heroText:
    "A passionate, experienced full stack developer.\nBuilding clean, customer-focused web applications end to end.",
  location: "Israel",
  profileImage: "/profile.png",
  yearsExperienceStartDate: "2023-01",
  technologiesCountLabel: "18+",
  coursesCountLabel: "35",
  mainFields: [
    "Full Stack Development",
    "Node.js",
    "Next.js",
    "React",
    "TypeScript",
    "REST APIs",
    "Databases",
    "System Design",
    "UI/UX (Figma)",
    "Cloud",
    "Agile",
  ],
} as const;

export const profile: Profile = validateProfile(profileData);
