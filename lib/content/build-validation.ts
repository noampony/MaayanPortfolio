/**
 * Build/dev-time self-check for the content validator (Task 3.2).
 *
 * Imported as a side effect from `loaders.ts` so `pnpm build` / `next dev` fail
 * when sample data is invalid or the confidentiality gate regresses.
 */

import { profile } from "./data/profile";
import { about } from "./data/about";
import { businessCard } from "./data/businessCard";
import { experiences } from "./data/experience";
import { impacts } from "./data/impact";
import { projects } from "./data/projects";
import {
  sampleExperienceReviewed,
  sampleExperienceUnreviewed,
  sampleProjectReviewed,
  sampleProjectUnreviewed,
} from "./fixtures";
import {
  filterConfidentialityReviewed,
  getUnreviewedWorkItems,
  validateExperience,
  validateProject,
} from "./validate";

function assertConfidentialityFilter(): void {
  const experiences = [
    validateExperience(sampleExperienceReviewed),
    validateExperience(sampleExperienceUnreviewed),
  ];
  const publishedExperiences = filterConfidentialityReviewed(experiences);
  if (publishedExperiences.length !== 1) {
    throw new Error(
      "Content validator self-check failed: confidentiality filter must exclude unreviewed experience items.",
    );
  }
  if (publishedExperiences[0]?.organization !== sampleExperienceReviewed.organization) {
    throw new Error(
      "Content validator self-check failed: confidentiality filter kept the wrong experience item.",
    );
  }

  const projects = [
    validateProject(sampleProjectReviewed),
    validateProject(sampleProjectUnreviewed),
  ];
  const publishedProjects = filterConfidentialityReviewed(projects);
  if (publishedProjects.length !== 1) {
    throw new Error(
      "Content validator self-check failed: confidentiality filter must exclude unreviewed project items.",
    );
  }
  if (publishedProjects[0]?.name !== sampleProjectReviewed.name) {
    throw new Error(
      "Content validator self-check failed: confidentiality filter kept the wrong project item.",
    );
  }
}

/** Verify the real Experience data is gated correctly (Task 6.1, spec §15.4). */
function assertExperienceConfidentialityGate(): void {
  const published = filterConfidentialityReviewed(experiences);
  if (published.some((entry) => entry.confidentialityReviewed !== true)) {
    throw new Error(
      "Content validator self-check failed: published experience output contains an unreviewed entry.",
    );
  }
  if (published.length < 1) {
    throw new Error(
      "Content validator self-check failed: expected at least one published experience entry.",
    );
  }
}

/** Verify the real Project data is gated correctly (spec §8.4, §15.4). */
function assertProjectConfidentialityGate(): void {
  const published = filterConfidentialityReviewed(projects);
  if (published.some((entry) => entry.confidentialityReviewed !== true)) {
    throw new Error(
      "Content validator self-check failed: published project output contains an unreviewed entry.",
    );
  }
  // Every project is academic work the owner approved for publication; none should
  // remain gated.
  if (getUnreviewedWorkItems(projects).length !== 0) {
    throw new Error(
      "Content validator self-check failed: a project is unexpectedly still gated (confidentialityReviewed !== true).",
    );
  }
  if (published.length < 1) {
    throw new Error(
      "Content validator self-check failed: expected at least one published project.",
    );
  }
}

/**
 * Verify the Volunteering & Community data validates and is correctly ordered.
 *
 * The carousel arc is built for a handful of cards, not an open-ended list, so the count is
 * bounded rather than pinned to one number - adding or removing a volunteering entry should
 * not require touching this file.
 */
function assertImpactData(): void {
  if (impacts.length < 3 || impacts.length > 9) {
    throw new Error(
      "Content validator self-check failed: expected 3-9 Volunteering & Community cards.",
    );
  }
  // No card may ship without a description or at least one impact bullet.
  if (impacts.some((card) => card.impactBullets.length === 0)) {
    throw new Error(
      "Content validator self-check failed: every Volunteering card must have at least one impact bullet.",
    );
  }
  // displayOrder must be the unique sequence 1..n, so the carousel order is unambiguous.
  const orders = impacts.map((card) => card.displayOrder).sort((a, b) => a - b);
  const isSequential = orders.every((order, index) => order === index + 1);
  if (new Set(orders).size !== orders.length || !isSequential) {
    throw new Error(
      `Content validator self-check failed: Volunteering displayOrder must be the unique sequence 1..${impacts.length}.`,
    );
  }
  // The sort above only proves displayOrder is a permutation of 1..n. The bento derives
  // its wide feature tiles from array position, so the array itself has to be authored in
  // that order - otherwise the wide tiles silently land on the wrong entries.
  if (impacts.some((card, index) => card.displayOrder !== index + 1)) {
    throw new Error(
      "Content validator self-check failed: Volunteering cards must be authored in displayOrder (1..n).",
    );
  }
  // `period` is optional in the model, but the CV gives a year for every volunteering
  // entry and the card head reserves space for the chip - a missing one is a design bug.
  if (impacts.some((card) => !card.period)) {
    throw new Error(
      "Content validator self-check failed: every Volunteering card must carry a `period` label.",
    );
  }
}

if (!profile.name) {
  throw new Error("Content validator self-check failed: profile data failed to load.");
}
if (!about.professionalSummary) {
  throw new Error("Content validator self-check failed: about data failed to load.");
}
if (!businessCard.isPromoted) {
  throw new Error("Content validator self-check failed: business card promotion was not confirmed.");
}
assertConfidentialityFilter();
assertExperienceConfidentialityGate();
assertProjectConfidentialityGate();
assertImpactData();
