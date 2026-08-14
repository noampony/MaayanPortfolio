/**
 * Technical Skills content.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV" → Technical Skills), split into the four
 * groups the CV itself uses, with the lab hardware pulled out of "Programming & Tools" into
 * its own group so the software and the bench instruments do not sit in one undifferentiated
 * pile.
 *
 * Unlike the previous owner's data, the CV's Soft Skills ARE modelled here: this CV lists
 * them as a first-class section, and there is no long professional summary elsewhere on the
 * page carrying them instead.
 *
 * Rules:
 * - No `proficiency` field is set anywhere - the CV states none.
 * - Every skill below is keyed in `skill-icons.ts`: the five products carry their
 *   official brand mark, the rest carry a concept mark. Renaming a skill here without
 *   renaming its key there drops it back to the initial-letter fallback in
 *   `SkillBadge`, so keep the two in step.
 */

import type { Skill } from "../types";
import { validateSkillList } from "../validate";

const skillData: unknown[] = [
  // ── Programming & Tools ──────────────────────────────────────────────────
  { name: "Python",  category: "Programming & Tools", displayOrder: 1 },
  { name: "C",       category: "Programming & Tools", displayOrder: 2 },
  { name: "Matlab",  category: "Programming & Tools", displayOrder: 3 },
  { name: "LabVIEW", category: "Programming & Tools", displayOrder: 4 },
  { name: "LTspice", category: "Programming & Tools", displayOrder: 5 },

  // ── Lab & Instrumentation ────────────────────────────────────────────────
  { name: "Oscilloscope",      category: "Lab & Instrumentation", displayOrder: 1 },
  { name: "Signal Generators", category: "Lab & Instrumentation", displayOrder: 2 },

  // ── Engineering Knowledge ────────────────────────────────────────────────
  { name: "Circuits",              category: "Engineering Knowledge", displayOrder: 1 },
  { name: "Semiconductors",        category: "Engineering Knowledge", displayOrder: 2 },
  { name: "Microelectronics",      category: "Engineering Knowledge", displayOrder: 3 },
  { name: "Electro-Optics",        category: "Engineering Knowledge", displayOrder: 4 },
  { name: "Signal Processing",     category: "Engineering Knowledge", displayOrder: 5 },
  { name: "System Control",        category: "Engineering Knowledge", displayOrder: 6 },
  { name: "Communication Systems", category: "Engineering Knowledge", displayOrder: 7 },

  // ── Soft Skills ──────────────────────────────────────────────────────────
  { name: "Problem-Solving", category: "Soft Skills", displayOrder: 1 },
  { name: "Teamwork",        category: "Soft Skills", displayOrder: 2 },
  { name: "Self-Learning",   category: "Soft Skills", displayOrder: 3 },
  { name: "Responsibility",  category: "Soft Skills", displayOrder: 4 },
  { name: "Initiative",      category: "Soft Skills", displayOrder: 5 },
];

export const skills: Skill[] = validateSkillList(skillData);
