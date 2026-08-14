import { HeroContent } from "@/components/sections/HeroContent";
import { heroFont } from "@/app/fonts";
import { profile } from "@/lib/content/data/profile";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Hero section - layout (Task 4.1), styling (Task 4.2), animations (Task 4.3).
 * The Contact CTA links to the `#contact` section (Task 11.3); the Resume CTA
 * remains a keyboard-focusable no-op until it is wired (Task 10.3).
 */
export function Hero() {
  const initials = getInitials(profile.name);

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className={cn("relative isolate w-full overflow-x-hidden font-hero", heroFont.variable)}
    >
      {/* Atmospheric backdrop - tokens only (§6.3) + decorative floating code (§8.1).
         A cluster of soft tan wash blobs bleeds in from the left edge over the warm
         page, the way the theme's reference composition does; a single camel blob
         on the right balances the portrait. Washes on a light page need far more
         opacity than a tint on a dark one to register at all, and they stay light
         enough that the text over them keeps well clear of the AA floor (§20). */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-bg-base" />
        <div className="absolute -left-24 -top-24 h-[min(60vh,26rem)] w-[min(80vw,26rem)] rounded-full bg-wash-camel opacity-65 blur-3xl" />
        <div className="absolute -left-40 top-1/4 h-[min(50vh,22rem)] w-[min(70vw,24rem)] rounded-full bg-wash-latte opacity-55 blur-3xl" />
        <div className="absolute -left-20 bottom-0 h-[min(46vh,20rem)] w-[min(64vw,22rem)] rounded-full bg-wash-sand opacity-50 blur-3xl" />
        <div className="absolute -left-10 -bottom-28 h-[min(34vh,15rem)] w-[min(44vw,16rem)] rounded-full bg-wash-honey opacity-40 blur-3xl" />
        <div className="absolute -right-1/4 top-1/4 h-[min(70vh,28rem)] w-[min(90vw,32rem)] rounded-full bg-wash-camel opacity-35 blur-3xl" />
        {/* Same film-grain tile the section backgrounds use, so the whole page reads
           as one material (see SectionBackground / .section-grain). */}
        <div className="section-grain" />
      </div>

      <div className="site-shell flex min-h-[calc(100dvh-4rem)] flex-col justify-center py-10 md:py-12 lg:py-16">
        <HeroContent initials={initials} />
      </div>
    </section>
  );
}
