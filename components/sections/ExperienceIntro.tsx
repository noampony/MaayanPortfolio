"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainerVariants } from "@/lib/motion";

/**
 * Animated intro for the Experience section - the shared `SectionHeading` inside a
 * scroll-triggered stagger container, played once on scroll-in and disabled under
 * reduced motion (then the content renders in its final, visible state). Kept as a
 * small client island so the parent `Experience` stays a server component.
 */
export function ExperienceIntro() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <motion.div
      initial={animate ? "hidden" : false}
      whileInView={animate ? "visible" : undefined}
      viewport={{ once: true, margin: "-80px" }}
      variants={staggerContainerVariants}
    >
      <SectionHeading
        headingId="experience-heading"
        title={
          <>
            My{" "}
            <span className="bg-gradient-to-r from-gradient-from via-gradient-via to-gradient-to bg-clip-text text-transparent">
              Path
            </span>{" "}
            So Far
          </>
        }
        lead="Hands-on experience and the studies behind it - most recent first."
      />
    </motion.div>
  );
}
