"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

import type { Impact } from "@/lib/content/types";
import { organizationMarker } from "@/lib/content/experienceLedger";
import { useGlareHandlers } from "@/components/ui/GlareHover";
import { ImpactIcon } from "@/components/ui/ImpactIcon";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

/**
 * A single Volunteering & Community card (spec §8.2). Presentation-agnostic content comes
 * from the validated {@link Impact} model.
 *
 * The card is built in layers rather than as a flat plate: the shared glass recipe (§6.7,
 * see `.skills-plate` / `.project-flip-face`), a gradient aura ring that lights on hover,
 * an inner sheen, a pointer-tracked accent spotlight, a hairline hatch, a ghost index
 * numeral and a gradient spine down the leading edge. `featured` renders the wide bento
 * tile - same layers, more room and larger type.
 *
 * The mark is a fixed square lockup frame rather than a height-constrained chip, so a
 * square logo (I-School, Shavot) reads at the same optical weight as a wide one (Elbit,
 * Perach). The frame's fill is `--bg-surface-raised`, i.e. white, so the two JPG logos'
 * baked white field disappears into it while the two alpha PNGs sit on the same white -
 * one treatment, both source kinds, no per-asset special-casing. Entries with no partner
 * logo get a decorative line icon ({@link ImpactIcon}) in the identical frame, falling
 * back to initials if none is mapped.
 *
 * Motion: the pointer tilts the card in 3D and moves the spotlight via CSS custom
 * properties written straight to the node (no React state, so a moving pointer never
 * re-renders), and the shared glare sweep still plays. Everything is gated behind
 * `prefers-reduced-motion` and a fine-pointer query, so the card is fully static on touch
 * and for users who asked for less motion.
 */
type ImpactCardProps = {
  impact: Impact;
  /** Stable id for the title, so the article can be `aria-labelledby` it. */
  headingId: string;
  /** 0-based position in the grid - drives the ghost numeral. */
  index: number;
  /** Renders the wide bento tile instead of the compact card. */
  featured?: boolean;
};

/**
 * Maximum tilt, in degrees, at the very corners of the card. Deliberately small: a
 * rotated plate re-rasterises its text, and past ~3deg that softening is visible on a
 * non-retina display.
 */
const TILT_DEGREES = 3;

/** Pointer affordances only exist where there is a real hovering pointer. */
const FINE_POINTER_QUERY = "(hover: hover) and (pointer: fine)";

export function ImpactCard({ impact, headingId, index, featured = false }: ImpactCardProps) {
  const { overlayRef, overlayStyle, handlers } = useGlareHandlers({
    transitionDuration: 900,
    playOnce: true,
  });
  const cardRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  // Server snapshot is `false`, so SSR markup matches the no-affordance branch and the
  // tilt/spotlight simply switch on after hydration - same idiom as Magnetic/CursorGlow.
  const finePointer = useMediaQuery(FINE_POINTER_QUERY);
  const interactive = !reduceMotion && finePointer;

  /**
   * Writes the pointer-relative tilt and spotlight custom properties, coalesced into one
   * rAF so a fast pointer cannot queue more style writes than the compositor can paint.
   */
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!interactive || event.pointerType !== "mouse") return;
      const card = cardRef.current;
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      const offsetX = event.clientX - bounds.left;
      const offsetY = event.clientY - bounds.top;
      const x = offsetX / bounds.width;
      const y = offsetY / bounds.height;

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * TILT_DEGREES}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * TILT_DEGREES}deg`);
        card.style.setProperty("--spot-x", `${offsetX}px`);
        card.style.setProperty("--spot-y", `${offsetY}px`);
        card.dataset.spot = "on";
      });
    },
    [interactive],
  );

  /** Returns the card to rest - the CSS transition carries it back, so no rAF here. */
  const handlePointerLeave = useCallback(() => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    const card = cardRef.current;
    if (!card) return;
    card.style.removeProperty("--tilt-x");
    card.style.removeProperty("--tilt-y");
    card.style.removeProperty("--spot-x");
    card.style.removeProperty("--spot-y");
    delete card.dataset.spot;
  }, []);

  /** Drop any frame still queued when the card unmounts mid-gesture. */
  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const logos = impact.logos ?? [];
  const icon = logos.length === 0 ? <ImpactIcon title={impact.title} /> : null;
  // `period` is validated as `YYYY`, `YYYY - YYYY` or `YYYY - Present`, so the sentinel is
  // the only thing that can end the label. Derived rather than carried as a second field,
  // which could contradict the label sitting next to it.
  const ongoing = /\bPresent$/.test(impact.period ?? "");

  return (
    <article
      ref={cardRef}
      className={`impact-card${featured ? " impact-card--featured" : ""}`}
      aria-labelledby={headingId}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...handlers}
    >
      {/* Decorative layers: pointer spotlight, hairline hatch, gradient leading spine. The
          aura ring and inner sheen are ::before/::after on the card itself. */}
      <span className="impact-card-spot" aria-hidden="true" />
      <span className="impact-card-hatch" aria-hidden="true" />
      <span className="impact-card-spine" aria-hidden="true" />

      {/* The shared glare sweep. */}
      <div ref={overlayRef} style={overlayStyle} aria-hidden="true" />

      <div className="impact-card-corner">
        <span className="impact-card-index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        {impact.period ? (
          <span className="impact-card-period" data-ongoing={ongoing || undefined}>
            {impact.period}
          </span>
        ) : null}
      </div>

      <div className="impact-card-body">
        <div className="impact-card-head">
          <div className="impact-card-logos">
            {logos.length > 0 ? (
              logos.map((logo, logoIndex) => (
                <span
                  key={logo.src}
                  className="impact-card-lockup"
                  style={{ "--logo-index": logoIndex } as CSSProperties}
                >
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.width}
                    height={logo.height}
                    className="impact-card-lockup-img"
                  />
                </span>
              ))
            ) : (
              <span className="impact-card-lockup" aria-hidden="true">
                {icon ?? (
                  <span className="impact-card-lockup-initials">
                    {organizationMarker(impact.title)}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>

        <h3 id={headingId} className="impact-card-title">
          {impact.title}
        </h3>
        <p className="impact-card-desc">{impact.description}</p>

        <ul className="impact-card-bullets">
          {impact.impactBullets.map((bullet, bulletIndex) => (
            <li
              key={bullet}
              className="impact-card-bullet"
              style={{ "--bullet-index": bulletIndex } as CSSProperties}
            >
              <span className="impact-card-bullet-disc" aria-hidden="true">
                <CheckIcon />
              </span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function CheckIcon() {
  return (
    <svg
      className="impact-card-bullet-icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M20 6 9 17l-5-5"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
