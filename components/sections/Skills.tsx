"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionBackground } from "@/components/layout/SectionBackground";
import { useGlareHandlers } from "@/components/ui/GlareHover";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SkillBadge } from "@/components/ui/SkillBadge";
import { skills } from "@/lib/content/data/skills";
import { revealItemVariants, staggerContainerVariants } from "@/lib/motion";

function groupByCategory(list: typeof skills) {
  const map = new Map<string, typeof skills>();
  for (const skill of list) {
    const bucket = map.get(skill.category) ?? [];
    bucket.push(skill);
    map.set(skill.category, bucket);
  }
  map.forEach((bucket) => {
    bucket.sort((a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0));
  });
  return map;
}

const grouped = groupByCategory(skills);

/**
 * Presentation only - the desktop arrangement, as an ordered list of
 * `[category, column span]`. Plates render in this order rather than in
 * `skills.ts` order, and the two double-width entries tile the 3-column grid
 * exactly (4 categories + 2 extra spans = 6 cells, i.e. two full rows), so no
 * plate is left as an orphan third-width tile in the last row.
 *
 * A category present in the data but missing here still renders - it is
 * appended after these, one column wide - so adding a category to `skills.ts`
 * degrades gracefully instead of dropping it from the page.
 */
const CATEGORY_LAYOUT: ReadonlyArray<readonly [category: string, span: 1 | 2]> = [
  ["Programming & Tools", 2],
  ["Lab & Instrumentation", 1],
  ["Engineering Knowledge", 2],
  ["Soft Skills", 1],
];

const CATEGORY_SPAN = new Map<string, 1 | 2>(CATEGORY_LAYOUT);
const CATEGORY_RANK = new Map(CATEGORY_LAYOUT.map(([category], i) => [category, i]));

/** Unlisted categories sort last; `Array.prototype.sort` is stable, so they keep data order. */
const rankOf = (category: string) => CATEGORY_RANK.get(category) ?? Number.MAX_SAFE_INTEGER;

const orderedCategories = Array.from(grouped.entries()).sort(
  ([a], [b]) => rankOf(a) - rankOf(b),
);

/**
 * No-JS fallback: Framer server-renders the `hidden` variant as inline style and
 * the reveal never runs, so restore the plates. The heading's accent line carries
 * its own variant (and its own class), so it needs restoring too - scoped to this
 * section so other sections keep their current behaviour.
 */
const NO_JS_FALLBACK = `
.skills-reveal,
#skills .about-copy-accent-line{opacity:1!important;transform:none!important}
`;

interface SkillCategoryPlateProps {
  category: string;
  categorySkills: typeof skills;
}

function SkillCategoryPlate({ category, categorySkills }: SkillCategoryPlateProps) {
  // Same sweep settings as ImpactCard / ContactMethodCard. The hook no-ops
  // under `prefers-reduced-motion`, so no extra guard is needed here.
  const { overlayRef, overlayStyle, handlers } = useGlareHandlers({
    transitionDuration: 900,
    playOnce: true,
  });

  return (
    <div className="skills-plate" {...handlers}>
      <div ref={overlayRef} style={overlayStyle} aria-hidden="true" />

      {/* Sits above the glare overlay, which is absolutely positioned at z-index 0. */}
      <div className="relative">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-mono text-[0.7rem] font-semibold uppercase tracking-widest text-accent">
            {category}
          </h3>
          <span aria-hidden="true" className="text-[0.7rem] tabular-nums text-text-muted">
            {categorySkills.length}
          </span>
        </div>

        <div aria-hidden="true" className="skills-plate-rule mt-2.5" />

        <ul
          className="m-0 mt-3.5 flex list-none flex-wrap gap-2 p-0"
          aria-label={`${category} skills`}
        >
          {categorySkills.map((skill) => (
            <li key={skill.name} className="flex">
              <SkillBadge skill={skill} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Technical Skills section (spec §8.6, Task 9.3).
 *
 * One frosted glass plate per category - the same `--glass-*` material as the
 * Impact and Contact cards - holding the category's skills as pills that wrap
 * to their natural widths. Because pills wrap rather than overflow a fixed
 * grid, no category needs a height clamp or a "show all" toggle.
 *
 * Motion is the house idiom: a stagger fade-up on scroll plus an accent glare
 * sweep on plate hover, both disabled under `prefers-reduced-motion`. The
 * `<noscript>` block restores the reveal opacity when JS is off.
 */
export function Skills() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="relative isolate overflow-hidden bg-bg-base py-16 lg:py-24"
    >
      <SectionBackground />
      <noscript>
        <style>{NO_JS_FALLBACK}</style>
      </noscript>

      <motion.div
        className="site-shell"
        initial={animate ? "hidden" : false}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainerVariants}
      >
        <SectionHeading
          className="skills-reveal"
          headingId="skills-heading"
          title={
            <>
              Technical{" "}
              <span className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to bg-clip-text text-transparent">
                Skills
              </span>
            </>
          }
          lead="The languages, instruments, and engineering fields I work with."
        />

        {/* Grid items stretch by default, and `.skills-plate` is `height: 100%`,
            so every plate in a row matches the tallest one and their bottom edges
            line up. Categories whose pills need fewer lines simply carry more
            empty glass at the bottom. */}
        <ul className="m-0 mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {orderedCategories.map(([category, categorySkills]) => (
            <motion.li
              key={category}
              variants={revealItemVariants}
              className={`skills-reveal flex${CATEGORY_SPAN.get(category) === 2 ? " lg:col-span-2" : ""}`}
            >
              <SkillCategoryPlate category={category} categorySkills={categorySkills} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
