import { profile } from "@/lib/content/data/profile";
import { cn } from "@/lib/utils";

/**
 * Site logo: the "MP" code-brackets monogram beside the owner's wordmark
 * (`profile.name`, so it can't drift from the content layer).
 *
 * The mark (`/public/site-logo-mark.svg`) carries its own orange/rust/gold gradient, so it is
 * rendered directly rather than through the CSS-mask technique used for a single-hue glyph.
 * It goes through a plain `<img>` rather than `next/image`: the source is an SVG, and the
 * image optimizer rejects SVG unless `dangerouslyAllowSVG` is enabled - which is not worth
 * turning on for a 36px mark that needs no resizing.
 *
 * Decorative (`aria-hidden`): the wrapping link in the navbar carries the accessible name
 * ("<name> - home"). The wordmark inherits its colour from that link, so it picks up the
 * link's hover/focus colour transition.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("group/logo inline-flex select-none items-center gap-2.5", className)}
    >
      <span className="site-logo-emblem">
        {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark; next/image rejects SVG sources by default */}
        <img src="/site-logo-mark.svg" alt="" width={36} height={36} />
      </span>
      <span className="text-[0.975rem] font-semibold tracking-tight">{profile.name}</span>
    </span>
  );
}
