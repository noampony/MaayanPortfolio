"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

import {
  EducationCertificateTrigger,
  EducationCertificateViewer,
} from "@/components/sections/EducationCertificateViewer";
import type {
  LedgerEducationEntry,
  LedgerEntry,
  LedgerRoleEntry,
} from "@/lib/content/experienceLedger";
import type { EducationCertificateRef, ExperienceEndDate } from "@/lib/content/types";
import { cn, withBoldMarkers } from "@/lib/utils";

/**
 * Experience timeline - an editorial ledger running down a single rail.
 *
 * One hairline rail on the left carries a small marker pill per entry (the organisation's
 * logo, or its initials when there is no logo). Beside it each entry lays out as a flat
 * record - index, date range, role, organisation, description, tech chips - separated from
 * the next by a hairline rule. Nothing is hidden behind a disclosure: the whole section is
 * readable at a glance and complete without JS.
 *
 * Two enhancements sit on top, both optional:
 * - **Rail progress.** A scroll-driven accent fill tracks how far down the timeline you
 *   have read (anchored at 60% of the viewport). It is a position indicator rather than
 *   decoration - the same reasoning as the navbar's progress bar - so it stays live under
 *   reduced motion. Without JS the rail renders fully drawn (the CSS fallback), so it never
 *   looks half-finished.
 * - **Entry reveal.** Each entry slides in from the rail as it scrolls into view. Driven by a
 *   `data-reveal` attribute an IntersectionObserver sets per entry, so the CSS keeps the
 *   transition - which means reduced motion and no-JS both simply get the finished, visible
 *   state rather than an entry stuck at `opacity: 0`. It targets an inner wrapper so it never
 *   fights the CSS hover nudge on the entry itself.
 *
 * Hover/focus on an entry brightens the role, nudges the record right and tilts its marker;
 * the transforms are reduced-motion-gated in CSS and `:focus-within` mirrors `:hover`, so
 * the same feedback reaches keyboard users.
 */

type ExperienceLedgerProps = {
  entries: readonly LedgerEntry[];
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

/** Format an ISO year-month (`2022-10`) as `Oct 2022`; pass `Present` through. */
function formatMonthYear(value: string): string {
  if (value === "Present") {
    return "Present";
  }
  const [year, month] = value.split("-");
  const label = MONTH_LABELS[Number(month) - 1];
  return label ? `${label} ${year}` : value;
}

/** `Jan 2023 - Dec 2025` / `Jan 2026 - Present`, with machine-readable `<time>` values. */
function DateRange({ startDate, endDate }: { startDate: string; endDate?: ExperienceEndDate }) {
  return (
    <>
      <time dateTime={startDate}>{formatMonthYear(startDate)}</time>
      {endDate ? (
        <>
          {" - "}
          {endDate === "Present" ? (
            "Present"
          ) : (
            <time dateTime={endDate}>{formatMonthYear(endDate)}</time>
          )}
        </>
      ) : null}
    </>
  );
}

/** Fraction of the viewport height at which an entry counts as "read". */
const RAIL_ANCHOR = 0.6;

/**
 * Paint the rail's accent fill from the scroll position, as a percentage on the rail's own
 * `--rail-fill`. The first value is written in an effect *before* the browser can transition
 * (there is no CSS transition on the fill - updates are already one-per-frame), so the
 * 100% no-JS fallback never flashes.
 *
 * Alongside it, `--rail-tip-opacity` hides the fill's glowing tip while progress is pinned at
 * 0% - at rest before the rail is reached, and again if the user scrolls back up past it - so
 * the tip only exists once the line is actually moving down, not sitting at a fixed point at
 * the top.
 */
function useRailFill(railRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) {
      return;
    }

    let frame = 0;

    const paint = () => {
      frame = 0;
      const rect = rail.getBoundingClientRect();
      if (rect.height === 0) {
        return;
      }
      const anchor = window.innerHeight * RAIL_ANCHOR;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      rail.style.setProperty("--rail-fill", `${(progress * 100).toFixed(2)}%`);
      // The glowing tip should only exist once the fill has actually left the top - not at
      // rest at 0%, whether that's on mount or after scrolling back up past the rail's start.
      rail.style.setProperty("--rail-tip-opacity", progress > 0 ? "1" : "0");
    };

    const schedule = () => {
      if (frame === 0) {
        frame = window.requestAnimationFrame(paint);
      }
    };

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [railRef]);
}

/**
 * Reveal each entry as it individually scrolls into view - an entry never finishes its
 * entrance before you have reached it. Entries already on screen at mount skip straight to
 * "revealed" (no entrance), so nothing flashes; the rest are armed (hidden while off-screen)
 * and revealed on intersection. The states are styled in CSS behind
 * `prefers-reduced-motion: no-preference`, and no-JS never gets the attribute at all, so both
 * see the entries fully drawn.
 */
function useEntryReveal(listRef: RefObject<HTMLElement | null>, count: number) {
  useEffect(() => {
    const list = listRef.current;
    if (!list) {
      return;
    }
    const items = Array.from(list.querySelectorAll<HTMLElement>(".xp-item"));
    if (items.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.06 },
    );

    for (const item of items) {
      // Leave already-revealed entries alone, so a re-run can't re-hide one that has since
      // scrolled back out of view.
      if (item.getAttribute("data-reveal") === "revealed") {
        continue;
      }
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
        item.setAttribute("data-reveal", "revealed");
      } else {
        item.setAttribute("data-reveal", "armed");
        observer.observe(item);
      }
    }

    return () => observer.disconnect();
  }, [listRef, count]);
}

export function ExperienceLedger({ entries }: ExperienceLedgerProps) {
  const [activeCertificate, setActiveCertificate] = useState<EducationCertificateRef | null>(null);
  const railRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLOListElement>(null);

  useRailFill(railRef);
  useEntryReveal(listRef, entries.length);

  return (
    <div className="xp-timeline">
      <div className="xp-track">
        <span ref={railRef} aria-hidden="true" className="xp-rail">
          <span className="xp-rail-fill" />
        </span>

        <ol ref={listRef} className="xp-items">
          {entries.map((entry, index) => (
            <LedgerItem
              key={entry.id}
              entry={entry}
              /* Oldest entry is 01 at the bottom, counting up towards the current role. */
              index={entries.length - index}
              onOpenCertificate={setActiveCertificate}
            />
          ))}
        </ol>
      </div>

      <EducationCertificateViewer
        certificate={activeCertificate}
        onClose={() => setActiveCertificate(null)}
      />
    </div>
  );
}

type LedgerItemProps = {
  entry: LedgerEntry;
  index: number;
  onOpenCertificate: (certificate: EducationCertificateRef) => void;
};

/** One ledger row: the rail marker plus the record beside it. */
function LedgerItem({ entry, index, onOpenCertificate }: LedgerItemProps) {
  const isCurrent = entry.kind === "role" && entry.isCurrent;

  return (
    <li className="xp-item">
      <span aria-hidden="true" className={cn("xp-marker", isCurrent && "xp-marker--current")}>
        {entry.markerLogo ? (
          // eslint-disable-next-line @next/next/no-img-element -- logo dimensions are variable SVGs; next/image requires explicit width/height
          <img src={entry.markerLogo} alt="" className="xp-marker-logo" />
        ) : (
          <span className="xp-marker-text">{entry.markerLabel}</span>
        )}
      </span>

      <div className="xp-content">
        <div className="xp-reveal">
          {entry.kind === "education" ? (
            <EducationRecord
              entry={entry}
              index={index}
              onOpenCertificate={onOpenCertificate}
            />
          ) : (
            <RoleRecord
              entry={entry}
              index={index}
              onOpenCertificate={onOpenCertificate}
            />
          )}
        </div>
      </div>
    </li>
  );
}

/** The shared record head: index, dates and any status/kind labels. */
function RecordMeta({ index, children }: { index: number; children: ReactNode }) {
  return (
    <div className="xp-meta">
      <span aria-hidden="true" className="xp-index">
        {String(index).padStart(2, "0")}
      </span>
      {children}
    </div>
  );
}

const currentBadge = (
  <span className="experience-current-tag">
    <span className="experience-current-tag-dot" aria-hidden="true" />
    Current
  </span>
);

function TechnologyChips({ technologies }: { technologies: readonly string[] }) {
  return (
    <ul aria-label="Technologies used" className="xp-tech">
      {technologies.map((tech) => (
        <li key={tech} className="experience-tag">
          {tech}
        </li>
      ))}
    </ul>
  );
}

type RecordProps<TEntry> = {
  entry: TEntry;
  index: number;
  onOpenCertificate: (certificate: EducationCertificateRef) => void;
};

/** A role record - the ledger's main entry type. */
function RoleRecord({ entry, index, onOpenCertificate }: RecordProps<LedgerRoleEntry>) {
  const {
    organization,
    organizationType,
    role,
    employmentType,
    startDate,
    endDate,
    duration,
    description,
    technologies,
    teamSize,
    link,
    certificate,
    isCurrent,
  } = entry;

  return (
    <>
      <RecordMeta index={index}>
        <span className="xp-date">
          <DateRange startDate={startDate} endDate={endDate} />
        </span>
        {duration ? <span className="xp-note">{duration}</span> : null}
        {employmentType ? <span className="xp-note">{employmentType}</span> : null}
        {isCurrent ? currentBadge : null}
      </RecordMeta>

      <h3 className="xp-role">{role}</h3>

      <p className="xp-org">
        <span className="xp-org-prefix">at </span>
        <span className="xp-org-name">{organization}</span>
        {organizationType ? <span> · {organizationType}</span> : null}
      </p>

      <p className="xp-desc">{description}</p>

      {teamSize ? (
        <p className="xp-detail">
          <span className="xp-detail-label">Team</span> · {teamSize}
        </p>
      ) : null}

      {technologies && technologies.length > 0 ? (
        <TechnologyChips technologies={technologies} />
      ) : null}

      {certificate || link ? (
        <div className="xp-actions">
          {certificate ? (
            <EducationCertificateTrigger certificate={certificate} onOpen={onOpenCertificate} />
          ) : null}
          {link ? (
            <a href={link} target="_blank" rel="noopener noreferrer" className="xp-link">
              View on LinkedIn
              <ExternalLinkIcon />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

/**
 * An education record closing out the ledger. Honours render as badges in the order the
 * content gives them. The in-page certificate viewer is wired to whichever certificates
 * exist: a "Preview certificate" trigger when the qualification has one, and - when an
 * honour has its own certificate - one pill that is both the honour badge and its trigger.
 * An entry with neither certificates nor honours simply renders no action row, rather than
 * a trigger that opens an empty viewer.
 */
function EducationRecord({
  entry,
  index,
  onOpenCertificate,
}: RecordProps<LedgerEducationEntry>) {
  const { education } = entry;

  const honorBadges: ReactNode[] = (education.honors ?? []).map((honor) =>
    honor.certificate ? (
      <span key={honor.label} className="experience-honor-group">
        <EducationCertificateTrigger
          certificate={honor.certificate}
          onOpen={onOpenCertificate}
          label={honor.label}
          leadingIcon={<HonorIcon />}
        />
      </span>
    ) : (
      <span key={honor.label} className="about-education-honor-badge">
        <HonorIcon />
        {honor.label}
      </span>
    ),
  );

  return (
    <>
      <RecordMeta index={index}>
        <span className="xp-date">{education.dateRange}</span>
        <span className="xp-note">Education</span>
      </RecordMeta>

      <h3 className="xp-role">{education.degree}</h3>

      <p className="xp-org">
        <span className="xp-org-prefix">at </span>
        <span className="xp-org-name">{education.institution}</span>
      </p>

      <p className="xp-desc">{withBoldMarkers(education.summary)}</p>

      {education.degreeCertificate || honorBadges.length > 0 ? (
        <div className="xp-actions">
          {education.degreeCertificate ? (
            <EducationCertificateTrigger
              certificate={education.degreeCertificate}
              onOpen={onOpenCertificate}
            />
          ) : null}
          {honorBadges}
        </div>
      ) : null}
    </>
  );
}

/** Honour star - the badge glyph for a distinction on an education entry. */
function HonorIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="h-3.5 w-3.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6L12 2z" />
    </svg>
  );
}

/** Decorative external-link glyph; the link text carries the accessible name. */
function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}
