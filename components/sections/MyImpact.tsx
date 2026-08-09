"use client";

import { motion, useReducedMotion } from "framer-motion";

import { impacts } from "@/lib/content/data/impact";
import { SectionBackground } from "@/components/layout/SectionBackground";
import { ImpactCard } from "@/components/ui/ImpactCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { revealItemVariants, staggerContainerVariants } from "@/lib/motion";

/**
 * Volunteering & Community section - replaces the former About section. Every
 * volunteering entry from the validated content model renders as a logo-led card in a
 * responsive grid (1 col -> 2 -> 3), mirroring the Projects & Labs layout: each card leads
 * with the partner/organization logo(s), then title, description, and impact bullets.
 *
 * Motion: a stagger fade-up reveal on scroll, gated behind `prefers-reduced-motion` (cards
 * render in place with no transform when reduced motion is requested). The `<noscript>`
 * block restores full opacity so the grid is completely readable with JS disabled.
 */

/** No-JS fallback: keep the grid visible instead of stuck at the reveal's hidden opacity. */
const NO_JS_FALLBACK = `.impact-reveal{opacity:1!important;transform:none!important}`;

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

        <ul className="impact-grid mt-10 grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {impacts.map((impact, index) => (
            <motion.li key={impact.title} variants={revealItemVariants} className="impact-reveal flex">
              <ImpactCard impact={impact} headingId={`volunteering-${index}-heading`} />
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
