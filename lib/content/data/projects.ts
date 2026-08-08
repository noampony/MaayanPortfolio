/**
 * Projects content (spec §8.4, §11.3) - used by the Projects Preview section.
 *
 * Confidentiality (spec §15.4, Dependency Rule 9): all projects are
 * owner-approved for publication (`confidentialityReviewed: true`). The three Check
 * Point projects are published in generalized, public-safe form (owner sign-off):
 * the company is named per §15.3; scale is stated generically ("billions of events
 * weekly", not an exact non-public figure) to match the approved Experience wording;
 * internal processing mechanics are softened. The volunteer Students Tracking System
 * uses generalized language only - no sensitive teenager / health / risk-evaluation
 * detail (§8.4 privacy note). The portfolio website is a personal project with fully
 * public content (no workplace, no confidential material).
 *
 * Still TBD (listed, not invented):
 * - Project years (§19.6) - `year` omitted everywhere.
 * - Final project categories (§19.6) - `category` omitted everywhere.
 * - Students Tracking System customer focus (§8.4) - `customerFocus` omitted for it.
 */

import type { Project } from "../types";
import { validateProjectList } from "../validate";

const projectData = [
  {
    // Sourced from the owner's CV ("Shani Penkar - CV" → Technical Projects). Published
    // because the CV is the owner's own outward-facing document; wording stays within what
    // the CV already states publicly.
    name: "Strategic Meeting Platform",
    role: "Key Developer",
    workplace: { name: "Kiloma LTD", logo: "/logos/kiloma.svg", showName: true },
    shortDescription:
      "A platform for managing strategic meetings that senior management follows closely - built with Next.js and Azure SQL.",
    problemSolved:
      "Customers needed a system for managing and tracking these meetings. I built one platform to handle it all: approvals, agenda planning, task tracking, and meeting summaries.",
    solution:
      "Dashboards give an easy overview of meetings and their status, the system reuses data across meetings so people don't re-enter the same information twice, and automatic email notifications remind people about follow-up tasks and actions.",
    techStack: [
      "Next.js",
      "Node.js",
      "TypeScript",
      "Azure SQL Database",
      "REST APIs",
      "Figma",
      "System Design",
      "Storybook",
    ],
    customerFocus:
      "Planned and implemented the platform while communicating with customers, ran demos with them, gathered feedback, and then improved the product based on it.",
    whyImportant:
      "I owned the project from start to finish - technical specification, UI/UX design in Figma, system architecture, full-stack implementation, and deployment.",
    confidentialityReviewed: true,
  },
  {
    // Sourced from the owner's CV ("Shani Penkar - CV" → Technical Projects). See the note
    // on the project above for the publication rationale.
    name: "Contract Management System",
    role: "Key Developer",
    workplace: { name: "Kiloma LTD", logo: "/logos/kiloma.svg", showName: true },
    shortDescription:
      "A web app for tracking and managing contracts - built with Next.js, Node.js, React, and TypeScript.",
    problemSolved:
      "Customers needed a system for managing their contracts. I built one platform to handle it all: budget usage tracking, expiration tracking, contract filtering, notifications, and favorites.",
    solution:
      "I defined the system architecture and designed the UX/UI in Figma together with the customers, then added custom notifications and automatic background emails - sent over SMTP - so people stay updated on contract changes.",
    techStack: [
      "Next.js",
      "Node.js",
      "React",
      "TypeScript",
      "MSSQL",
      "SMTP",
      "Figma",
      "System Design",
    ],
    customerFocus:
      "Worked directly with managerial-level customers to plan the system and design the UX/UI in Figma, shaping it around how they manage contracts.",
    whyImportant:
      "Built end to end with the customers who use it - from architecture and design through to a system that keeps them automatically updated.",
    confidentialityReviewed: true,
  },
  {
    // §8.4 Project 6 - personal; this very website. No workplace, fully public content.
    name: "Developer Portfolio Website",
    role: "Solo Developer",
    shortDescription:
      "The site you're reading right now - my portfolio and online CV, with a custom look and subtle animations.",
    problemSolved:
      "I wanted one home for my CV, experience, and projects - built with real engineering care, not a generic template.",
    solution:
      "Built from scratch with Next.js. All content lives in typed, validated data files, the UI is a small reusable design system, and every animation respects reduced-motion preferences.",
    techStack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "shadcn/ui",
      "Vercel",
      "AI Development",
    ],
    whyImportant:
      "As a backend developer, building the entire frontend myself - design, animations, accessibility, performance - pushed me far outside my comfort zone and shows full-stack range.",
    confidentialityReviewed: true,
  },
] as const;

export const projects: Project[] = validateProjectList(projectData);
