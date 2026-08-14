"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

import { impacts } from "@/lib/content/data/impact";
import { SectionBackground } from "@/components/layout/SectionBackground";
import { ImpactCard } from "@/components/ui/ImpactCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { easeOut, revealItemVariants, staggerContainerVariants } from "@/lib/motion";

/**
 * Volunteering & Community section - replaces the former About section. Every
 * volunteering entry from the validated content model renders as a card in an asymmetric
 * bento grid: the two ongoing programmes lead as wide feature tiles, the past entries
 * follow as compact tiles. The grid runs on six columns (the LCM of the 2-up and 3-up
 * rows) so both tile sizes land on whole tracks and no breakpoint leaves a hole.
 *
 * Motion: a stagger reveal that lifts, un-skews and un-blurs each tile on scroll, on the
 * house easing curve. Everything is gated behind `prefers-reduced-motion` (tiles then
 * render in place with no transform), and the `<noscript>` block restores the resting
 * state so the grid is completely readable with JS disabled.
 */

/**
 * How many entries lead the bento as wide tiles. The CSS widow guards in globals.css
 * assume these are the first two children - re-derive their `nth-child` arithmetic if
 * this number ever changes.
 */
const FEATURE_TILE_COUNT = 2;

/**
 * No-JS fallback: keep the grid visible instead of stuck at the reveal's hidden state.
 * `filter` matters as much as the other two - Framer 12's `useReducedMotion()` returns
 * `null` on the server, so the hidden variant (blur included) is serialised into the HTML.
 */
const NO_JS_FALLBACK = `.impact-reveal{opacity:1!important;transform:none!important;filter:none!important}`;

/**
 * Tile reveal - the tiles rise, straighten out of a slight backward tilt and resolve from
 * a blur, so the bento assembles rather than simply appearing. `.impact-cell` supplies the
 * perspective `rotateX` needs; the blur is deliberately shorter than the rest of the move
 * because it is the one non-compositor property here.
 */
const tileRevealVariants: Variants = {
  hidden: { opacity: 0, y: 44, rotateX: 10, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easeOut,
      filter: { duration: 0.45, ease: easeOut },
    },
  },
};

/** Slightly tighter stagger than the site default - five tiles, so the wave stays brisk. */
const gridStaggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.06 } },
};

export function MyImpact() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <section
      id="volunteering"
      aria-labelledby="volunteering-heading"
      className="impact-section relative isolate overflow-hidden bg-bg-base py-16 lg:py-24"
    >
      <SectionBackground />

      <noscript>
        <style>{NO_JS_FALLBACK}</style>
      </noscript>

      <motion.div
        className="site-shell relative z-10"
        initial={animate ? "hidden" : false}
        whileInView={animate ? "visible" : undefined}
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainerVariants}
      >
        <SectionHeading
          className="impact-reveal max-w-measure"
          headingId="volunteering-heading"
          title="Volunteering"
          lead={
            <>The work I do outside my studies, and the people it is for.</>
          }
        />

        <motion.ul
          className="impact-grid list-none p-0"
          variants={animate ? gridStaggerVariants : undefined}
        >
          {impacts.map((impact, index) => {
            const featured = index < FEATURE_TILE_COUNT;
            return (
              /* The reveal transform lives here, on the cell; the pointer tilt lives on
                 the card inside it. Keep them on separate elements - merging them would
                 make the tilt fight the reveal mid-animation. */
              <motion.li
                key={impact.title}
                variants={animate ? tileRevealVariants : revealItemVariants}
                className="impact-reveal impact-cell"
                data-tile={featured ? "feature" : "compact"}
              >
                <ImpactCard
                  impact={impact}
                  headingId={`volunteering-${index}-heading`}
                  index={index}
                  featured={featured}
                />
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
