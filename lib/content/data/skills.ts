/**
 * Technical Skills content (spec §8.6, §11.5).
 *
 * Sourced from the owner's CV ("Shani Penkar - CV" → Skills → Technical), grouped into
 * categories for the section's category cards. `System Design`, `Agile`, and
 * `Full Development Lifecycle` come from the CV's Experience and Technical Projects
 * sections rather than its Technical skills list.
 *
 * The CV's "Personal" skills (Teamwork, Self-Learning, Ambitious, Creativity, Problem
 * Solving, Communication, Organization) are deliberately NOT modelled here - this section
 * renders technology tiles; those traits are carried by the About summary instead.
 *
 * Rules:
 * - No `proficiency` field is set anywhere - proficiency display is TBD (§8.6).
 * - Tiles without an entry in `skill-icons.ts` fall back to the skill's initial, so a
 *   missing brand icon degrades gracefully rather than breaking the tile.
 */

import type { Skill } from "../types";
import { validateSkillList } from "../validate";

const skillData: unknown[] = [
  // ── Programming ──────────────────────────────────────────────────────────
  { name: "JavaScript", category: "Programming", displayOrder: 1 },
  { name: "TypeScript", category: "Programming", displayOrder: 2 },
  { name: "Node.js",    category: "Programming", displayOrder: 3 },
  { name: "Python",     category: "Programming", displayOrder: 4 },
  { name: "HTML",       category: "Programming", displayOrder: 5 },
  { name: "CSS",        category: "Programming", displayOrder: 6 },
  { name: "SQL",        category: "Programming", displayOrder: 7 },

  // ── Frameworks & Libraries ───────────────────────────────────────────────
  { name: "Next.js",    category: "Frameworks & Libraries", displayOrder: 1 },
  { name: "React.js",   category: "Frameworks & Libraries", displayOrder: 2 },
  { name: "Express.js", category: "Frameworks & Libraries", displayOrder: 3 },
  { name: "Storybook",  category: "Frameworks & Libraries", displayOrder: 4 },

  // ── Databases ────────────────────────────────────────────────────────────
  { name: "MSSQL",      category: "Databases", displayOrder: 1 },
  { name: "Azure SQL",  category: "Databases", displayOrder: 2 },
  { name: "PostgreSQL", category: "Databases", displayOrder: 3 },
  { name: "MongoDB",    category: "Databases", displayOrder: 4 },

  // ── Cloud & Infrastructure ───────────────────────────────────────────────
  { name: "AWS",     category: "Cloud & Infrastructure", displayOrder: 1 },
  { name: "Docker",  category: "Cloud & Infrastructure", displayOrder: 2 },
  { name: "Jenkins", category: "Cloud & Infrastructure", displayOrder: 3 },

  // ── Tools & Design ───────────────────────────────────────────────────────
  { name: "Git",    category: "Tools & Design", displayOrder: 1 },
  { name: "GitHub", category: "Tools & Design", displayOrder: 2 },
  { name: "Figma",  category: "Tools & Design", displayOrder: 3 },

  // ── Concepts & Methodologies ─────────────────────────────────────────────
  { name: "REST APIs",                   category: "Concepts & Methodologies", displayOrder: 1 },
  { name: "System Design",               category: "Concepts & Methodologies", displayOrder: 2 },
  { name: "Agile",                       category: "Concepts & Methodologies", displayOrder: 3 },
  { name: "Full Development Lifecycle",  category: "Concepts & Methodologies", displayOrder: 4 },

  // ── AI Development ───────────────────────────────────────────────────────
  { name: "ChatGPT",         category: "AI Development", displayOrder: 1 },
  { name: "Claude Code",     category: "AI Development", displayOrder: 2 },
  { name: "GitHub Copilot",  category: "AI Development", displayOrder: 3 },
  { name: "Cursor",          category: "AI Development", displayOrder: 4 },
  { name: "AI Agents",       category: "AI Development", displayOrder: 5 },
  { name: "OpenAI API",      category: "AI Development", displayOrder: 6 },
];

export const skills: Skill[] = validateSkillList(skillData);
