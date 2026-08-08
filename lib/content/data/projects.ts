/**
 * Projects & Labs content - used by the Projects section.
 *
 * Sourced from the owner's CV ("Maayan Pony - CV" → Projects & Labs). All three are
 * academic work at HIT and carry no confidential material, so each is marked
 * `confidentialityReviewed: true`.
 *
 * The CV gives one line per entry. The copy below expands that line into the fields the
 * card needs without adding facts the CV does not state - no results, no grades, and no
 * tooling that is not either named in the CV entry itself or in its Technical Skills list.
 *
 * ⚠️ The capstone is explicitly in progress. Its scope, partner deliverables and results
 * are deliberately not described beyond what the CV states; revisit once the owner confirms
 * what can be published (the partner, Animal Health Technology Labs, is named on the CV).
 *
 * Still absent by design: project years (`year`) and categories (`category`) are omitted
 * everywhere rather than invented.
 */

import type { Project } from "../types";
import { validateProjectList } from "../validate";

const projectData = [
  {
    name: "Capstone Engineering Project",
    role: "Student Engineer",
    shortDescription:
      "My final engineering project, carried out in collaboration with Animal Health Technology Labs. In progress.",
    problemSolved:
      "The capstone is the degree's end-to-end engineering exercise: an industry-partnered problem taken from definition through to a working result, with a real partner's constraints rather than a textbook's.",
    whyImportant:
      "It is the piece of the degree that most resembles industry work - an external partner, a moving target, and a result that has to hold up outside the lab.",
    techStack: ["Engineering Design", "Industry Collaboration"],
    confidentialityReviewed: true,
  },
  {
    name: "Microcontrollers Lab",
    role: "Student Engineer",
    shortDescription:
      "Embedded systems designed, programmed in C, and tested on real hardware in the HIT Microcontrollers Lab.",
    problemSolved:
      "The lab asks for working embedded systems rather than paper designs. Each one had to be programmed in C, brought up on real hardware, and tested until it behaved to spec.",
    solution:
      "Designed the system, wrote the firmware in C, then debugged it against the hardware itself - where the gap between what the design says and what the board does is the whole exercise.",
    techStack: ["C", "Microcontrollers", "Embedded Systems", "Hardware Testing"],
    whyImportant:
      "This is where circuit theory and digital design stop being coursework and start being something that runs.",
    confidentialityReviewed: true,
  },
  {
    name: "Semiconductors Lab",
    role: "Student Engineer",
    shortDescription:
      "Characterization of diodes and transistors, with I-V curves extracted from measurement.",
    problemSolved:
      "Datasheet values only go so far. The lab required measuring real devices, extracting their I-V characteristics directly, and reconciling the measurements with the device physics behind them.",
    solution:
      "Built the measurement setups, swept the devices, extracted the I-V curves, and analyzed the results against the expected semiconductor behaviour.",
    techStack: [
      "Semiconductor Devices",
      "I-V Characterization",
      "Lab Instrumentation",
      "Data Analysis",
    ],
    whyImportant:
      "Device characterization is the groundwork for the Microelectronics and Electro-Optics specialization I chose.",
    confidentialityReviewed: true,
  },
] as const;

export const projects: Project[] = validateProjectList(projectData);
