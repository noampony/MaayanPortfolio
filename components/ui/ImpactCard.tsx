"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent } from "react";
import { useReducedMotion } from "framer-motion";

import type { Impact } from "@/lib/content/types";
import { organizationMarker } from "@/lib/content/experienceLedger";
import { useGlareHandlers } from "@/components/ui/GlareHover";

/**
 * A single Volunteering & Community card (spec §8.2). Presentation-agnostic content comes
 * from the validated {@link Impact} model; the card leads with the partner/organization
 * logo(s) - or, when a card has none, initials in the same style used by the Experience
 * rail (see {@link organizationMarker}).
 *
 * The card is built in layers rather than as a flat plate: the organization's own logo is
 * re-used as a large multiply-blended watermark (so each card carries its own imagery
 * without new assets), over an accent bloom, a hairline hatch, a ghost index numeral and
 * a gradient spine down the leading edge. `featured` renders the first entry as the wide
 * bento tile - same layers, two columns and larger type.
 *
 * Motion: the pointer tilts the card in 3D via CSS custom properties written straight to
 * the node (no React state, so a moving pointer never re-renders), the spine and
 * watermark respond on hover, and the shared glare sweep still plays. All of it is gated
 * behind `prefers-reduced-motion`, which leaves the card completely static.
 */
type ImpactCardProps = {
  impact: Impact;
  /** Stable id for the title, so the article can be `aria-labelledby` it. */
  headingId: string;
  /** 0-based position in the grid - drives the ghost numeral and the bloom's placement. */
  index: number;
  /** Renders the wide two-column bento tile instead of the standard card. */
  featured?: boolean;
};

/**
 * Maximum tilt, in degrees, at the very corners of the card. Deliberately small: a
 * rotated plate re-rasterises its text, and past ~3deg that softening is visible on a
 * non-retina display.
 */
const TILT_DEGREES = 3;

export function ImpactCard({ impact, headingId, index, featured = false }: ImpactCardProps) {
  const { overlayRef, overlayStyle, handlers } = useGlareHandlers({
    transitionDuration: 900,
    playOnce: true,
  });
  const cardRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  /**
   * Writes the pointer-relative tilt/highlight custom properties, coalesced into one
   * rAF so a fast pointer cannot queue more style writes than the compositor can paint.
   */
  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (reduceMotion || event.pointerType !== "mouse") return;
      const card = cardRef.current;
      if (!card) return;

      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;

      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        card.style.setProperty("--tilt-x", `${(0.5 - y) * 2 * TILT_DEGREES}deg`);
        card.style.setProperty("--tilt-y", `${(x - 0.5) * 2 * TILT_DEGREES}deg`);
        card.style.setProperty("--pointer-x", `${x * 100}%`);
        card.style.setProperty("--pointer-y", `${y * 100}%`);
      });
    },
    [reduceMotion],
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
    card.style.removeProperty("--pointer-x");
    card.style.removeProperty("--pointer-y");
  }, []);

  /** Drop any frame still queued when the card unmounts mid-gesture. */
  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const watermark = impact.logos?.[0];

  return (
    <article
      ref={cardRef}
      className={`impact-card${featured ? " impact-card--featured" : ""}`}
      style={{ "--card-index": index } as CSSProperties}
      aria-labelledby={headingId}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      {...handlers}
    >
      {/* Layer 1: the organization's mark, blown up and multiply-blended into the plate. */}
      {watermark ? (
        <span className="impact-card-watermark" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo dimensions are variable; next/image requires explicit width/height */}
          <img src={watermark.src} alt="" className="impact-card-watermark-img" />
        </span>
      ) : (
        <span className="impact-card-watermark impact-card-watermark--text" aria-hidden="true">
          {organizationMarker(impact.title)}
        </span>
      )}

      {/* Layer 2: accent bloom that follows the pointer, hatch texture, gradient spine. */}
      <span className="impact-card-bloom" aria-hidden="true" />
      <span className="impact-card-hatch" aria-hidden="true" />
      <span className="impact-card-spine" aria-hidden="true" />

      {/* Layer 3: the shared glare sweep. */}
      <div ref={overlayRef} style={overlayStyle} aria-hidden="true" />

      <span className="impact-card-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="impact-card-body">
        <div className="impact-card-head">
          <div className="impact-card-logos">
            {impact.logos && impact.logos.length > 0 ? (
              impact.logos.map((logo) => (
                <span key={logo.src} className="impact-card-logo">
                  {/* eslint-disable-next-line @next/next/no-img-element -- logo dimensions are variable; next/image requires explicit width/height */}
                  <img src={logo.src} alt={logo.alt} className="impact-card-logo-img" />
                </span>
              ))
            ) : (
              <span className="impact-card-logo impact-card-logo--initials" aria-hidden="true">
                {organizationMarker(impact.title)}
              </span>
            )}
          </div>

          {impact.period ? <span className="impact-card-period">{impact.period}</span> : null}
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
