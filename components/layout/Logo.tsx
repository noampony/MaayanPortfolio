import Image from "next/image";

import { profile } from "@/lib/content/data/profile";
import { cn } from "@/lib/utils";

/**
 * Site logo: the "SP" code-brackets monogram beside the owner's wordmark
 * (`profile.name`, so it can't drift from the content layer).
 *
 * The mark (`/public/site-logo-mark.png`) already carries its own rose/plum/gold
 * gradient, so it's rendered directly as an image rather than through the CSS-mask
 * technique used for the previous single-hue glyph.
 *
 * Decorative (`aria-hidden`): the wrapping link in the navbar carries the
 * accessible name ("<name> - home"). The wordmark inherits its colour from
 * that link, so it picks up the link's hover/focus colour transition.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("group/logo inline-flex select-none items-center gap-2.5", className)}
    >
      <span className="site-logo-emblem">
        <Image src="/site-logo-mark.png" alt="" width={36} height={36} priority />
      </span>
      <span className="text-[0.975rem] font-semibold tracking-tight">{profile.name}</span>
    </span>
  );
}
