import Image from "next/image";

import type { Skill } from "@/lib/content/types";
import { getSkillMark } from "@/lib/content/skill-icons";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

/**
 * A single skill, as an inline pill - mark on the left, name beside it. Laying the
 * two out horizontally (rather than stacking them in a fixed-width tile) lets a
 * category's pills wrap to their natural widths, so no two categories collapse
 * into the same rigid grid.
 *
 * Official product logos render in the vendor's own colours - inline SVG where the
 * artwork is vector, `next/image` where it is a gradient render that flat fills
 * cannot express. Concept marks carry no `fill`, so `currentColor` resolves to the
 * accent set on the `<svg>` and they read as a set.
 *
 * The mark is decorative (`aria-hidden`, and empty `alt` on the raster logos) - the
 * name is always rendered as text, never a tooltip, so a skill is readable without
 * hovering (spec §8.6). Skills with no mark fall back to their initial.
 */
export function SkillBadge({ skill, className }: SkillBadgeProps) {
  const mark = getSkillMark(skill.name);

  return (
    <span className={cn("skill-pill", className)}>
      {mark === null ? (
        <span
          aria-hidden="true"
          className="skill-pill-icon flex items-center justify-center rounded-full bg-accent/15 text-[0.5625rem] font-semibold text-accent"
        >
          {skill.name.charAt(0)}
        </span>
      ) : mark.kind === "image" ? (
        <Image
          src={mark.src}
          alt=""
          aria-hidden="true"
          // The asset is trimmed to the artwork, so aspect ratios vary; `object-contain`
          // fits it inside the square 16px box instead of stretching it.
          className="skill-pill-icon object-contain"
        />
      ) : (
        <svg
          viewBox={mark.viewBox}
          aria-hidden="true"
          fillRule={mark.fillRule}
          className="skill-pill-icon text-accent"
        >
          {mark.paths.map((path, i) => (
            <path
              key={i}
              d={path.d}
              fill={path.fill ?? "currentColor"}
              stroke={path.stroke}
              strokeWidth={path.strokeWidth}
            />
          ))}
        </svg>
      )}
      {skill.name}
    </span>
  );
}
