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
 * bento grid: the newest entry leads as a wide two-column tile, the rest follow as
 * standard tiles, so the grid fills cleanly at every breakpoint (1 col -> 2 -> 3) instead
 * of leaving a hole in the last row.
 *
 * Motion: a stagger reveal that lifts, scales and un-skews each tile on scroll, on the
 * house easing curve. Everything is gated behind `prefers-reduced-motion` (tiles then
 * render in place with no transform), and the `<noscript>` block restores full opacity so
 * the grid is completely readable with JS disabled.
 */

/** No-JS fallback: keep the grid visible instead of stuck at the reveal's hidden state. */
const NO_JS_FALLBACK = `.impact-reveal{opacity:1!important;transform:none!important}`;

/**
 * Tile reveal - the shared fade-up with a slight scale and a longer travel, so the bento
 * tiles settle into place rather than simply appearing. Transform/opacity only.
 */
const tileRevealVariants: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.75, ease: easeOut },
  },
};

/** Slightly tighter stagger than the site default - five tiles, so the wave stays brisk. */
const gridStaggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.08 } },
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
          title="Volunteering & Community"
          lead={
            <>Where I give my time outside the lecture hall - and what each one is for.</>
          }
        />

        <motion.ul
          className="impact-grid list-none p-0"
          variants={animate ? gridStaggerVariants : undefined}
        >
          {impacts.map((impact, index) => (
            <motion.li
              key={impact.title}
              variants={animate ? tileRevealVariants : revealItemVariants}
              className={`impact-reveal impact-cell${index === 0 ? " impact-cell--featured" : ""}`}
            >
              <ImpactCard
                impact={impact}
                headingId={`volunteering-${index}-heading`}
                index={index}
                featured={index === 0}
              />
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
