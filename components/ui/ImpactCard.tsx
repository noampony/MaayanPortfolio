"use client";

import type { Impact } from "@/lib/content/types";
import { organizationMarker } from "@/lib/content/experienceLedger";
import { useGlareHandlers } from "@/components/ui/GlareHover";

/**
 * A single Volunteering & Community grid card (spec §8.2). Presentation-agnostic content
 * comes from the validated {@link Impact} model; the card leads with the partner/
 * organization logo(s) - or, when a card has none, initials in the same style used by the
 * Experience rail (see {@link organizationMarker}) - so every entry reads consistently.
 */
type ImpactCardProps = {
  impact: Impact;
  /** Stable id for the title, so the article can be `aria-labelledby` it. */
  headingId: string;
};

export function ImpactCard({ impact, headingId }: ImpactCardProps) {
  const { overlayRef, overlayStyle, handlers } = useGlareHandlers({
    transitionDuration: 900,
    playOnce: true,
  });

  return (
    <article className="impact-card" aria-labelledby={headingId} {...handlers}>
      <div ref={overlayRef} style={overlayStyle} aria-hidden="true" />

      <div className="impact-card-body">
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

        <h3 id={headingId} className="impact-card-title">
          {impact.title}
        </h3>
        <p className="impact-card-desc">{impact.description}</p>
        <ul className="impact-card-bullets">
          {impact.impactBullets.map((bullet) => (
            <li key={bullet} className="impact-card-bullet">
              <CheckIcon />
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
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
