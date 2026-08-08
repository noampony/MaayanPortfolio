/**
 * Experience content (spec §8.3, §11.2) - used by the Experience timeline.
 *
 * Sourced from the owner's CV ("Shani Penkar - CV" → Professional Experience). Published
 * because the CV is the owner's own outward-facing document and the owner asked for its
 * content to go on the site, so the §15.4 confidentiality gate is met by the source
 * itself; nothing is added beyond what the CV already states publicly.
 *
 * One organization → one card. The promotion is modelled with `previousRoles`, so the
 * Kiloma card renders the Senior role first and the earlier role below a separator
 * instead of splitting Kiloma across two timeline nodes.
 *
 * ⚠️ Dates. The CV lists ONE continuous role ("Full Stack Developer, 2023-Present") with
 * no months and no promotion date. The owner supplied the split - the Senior role starts
 * 2026 - so:
 *   - Lead Full Stack Developer: 2026-01 → Present
 *   - Full Stack Developer:        2023-01 → 2025-12
 * The months (January in both cases) are the owner's "2026-present" / the CV's "2023"
 * read at year granularity. Confirm the exact months before publishing.
 *
 * The CV's five role bullets are divided between the two sections: ownership, technical
 * specification, lifecycle and stakeholder work sit on the Senior section; hands-on build,
 * maintenance, Agile delivery and code-quality work sit on the earlier section.
 */

import type { Experience } from "../types";
import { validateExperienceList } from "../validate";

const KILOMA_STACK = ["Node.js", "Next.js", "React", "TypeScript", "SQL", "REST APIs", "Web Design"] as const;

/**
 * Experience entries - stored current-role-first (reverse chronological);
 * final ordering is the timeline's concern (Task 6.2).
 */
const experienceData = [
  {
    organization: "Kiloma Advanced Solutions",
    organizationLogo: "/logos/kiloma.svg",
    role: "Lead Full Stack Developer",
    startDate: "2026-01",
    endDate: "Present",
    technologies: [
      "Node.js",
      "Next.js",
      "React",
      "TypeScript",
      "SQL",
      "System Architecture",
      "Claude Code",
    ],
    description:
      "I lead end-to-end development of web applications using Node.js, Next.js, React, TypeScript, and more. I translate product requirements into technical specifications and own the full development lifecycle - architecture design, code, testing, infrastructure and deployment - to deliver production-ready solutions. I meet with customers to guide them through the systems I build and gather their feedback, and I lead Claude Code adoption on the team.",
    previousRoles: [
      {
        role: "Full Stack Developer",
        startDate: "2023-01",
        endDate: "2025-12",
        durationLabel: "3 years",
        technologies: [...KILOMA_STACK, "Agile"],
        description:
          "Developed full-stack web applications using Node.js, Next.js, React, TypeScript, and MSSQL. Maintained and improved existing systems, and worked within an Agile methodology. Continuously adopted new technologies and focused on efficient, clean, maintainable code in a fast-paced, dynamic environment.",
      },
    ],
    confidentialityReviewed: true,
  },
] as const;

export const experiences: Experience[] = validateExperienceList(experienceData);
