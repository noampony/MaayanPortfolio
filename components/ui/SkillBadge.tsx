import type { Skill } from "@/lib/content/types";
import { getSkillColor, getSkillIcon } from "@/lib/content/skill-icons";
import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  skill: Skill;
  className?: string;
}

/**
 * A single skill, as an inline pill - brand mark on the left, name beside it.
 * Laying the two out horizontally (rather than stacking them in a fixed-width
 * tile) lets a category's pills wrap to their natural widths, so no two
 * categories collapse into the same rigid grid.
 *
 * The mark is decorative (`aria-hidden`) - the name is always rendered as text,
 * never a tooltip, so a skill is readable without hovering (spec §8.6). Skills
 * with no mark at all fall back to their initial in the site accent.
 */
export function SkillBadge({ skill, className }: SkillBadgeProps) {
  const icon = getSkillIcon(skill.name);
  const color = getSkillColor(skill.name);

  return (
    <span className={cn("skill-pill", className)}>
      {icon ? (
        <svg
          viewBox={icon.viewBox}
          aria-hidden="true"
          className="skill-pill-icon fill-current"
          style={{ color }}
        >
          {/* A mark may be several paths (MATLAB's membrane is three). They all take
              the same fill, so overlapping subshapes union instead of cancelling. */}
          {icon.paths.map((d, i) => (
            <path key={i} d={d} />
          ))}
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="skill-pill-icon flex items-center justify-center rounded-full bg-accent/15 text-[0.5625rem] font-semibold text-accent"
        >
          {skill.name.charAt(0)}
        </span>
      )}
      {skill.name}
    </span>
  );
}
