# AGENTS.md

Guidance for AI coding agents working in this repository. Read this before doing anything.

## What this project is

A personal portfolio website / online CV for **Maayan Pony**, a fourth-year Electrical &
Electronics Engineering B.Sc. student at the Holon Institute of Technology (HIT),
specializing in Electro-Optics and Microelectronics.

The codebase started as a clone of a friend's portfolio (Shani Penkar's) and was rebranded.
If you find any remaining reference to the previous owner - her name, photos, employers,
certificates, courses, or projects - it is a bug: remove it, do not adapt it.

## Source of truth for content

**The CV at `public/resume.pdf` is the single source of truth for every published fact.**

- Do not invent content. No metrics, dates, grades, employers, technologies, or outcomes
  that the CV does not state. If a field needs a value the CV does not supply, leave the
  optional field absent - the validator drops absent optionals rather than rendering
  placeholders - or ask the owner.
- The CV gives years without months in several places. Where a `YYYY-MM` value is required,
  anchor to January (start) / December (end) and say so in a comment. Do not present an
  invented month as fact.
- All content lives in `lib/content/data/*.ts` behind the validators in
  `lib/content/validate.ts`. Components read from there; never hardcode a name, a number, or
  a contact detail in a component.

## Tech stack (authorized dependencies only)

Next.js (App Router) · TypeScript (strict) · Tailwind CSS · Framer Motion · `next/font` ·
pnpm · deploy to Vercel.

**Do not add any other dependency** without explicit owner approval and a license check
(no GPL in proprietary modules).

## How to work here

- **Keep the build green at all times:** `pnpm build`, `pnpm lint`, and `pnpm type-check`
  must pass; no browser console errors.
- **No open trails.** No half-finished components, dead links, placeholder UI, or leftover
  `TODO`/`FIXME`.
- **Blocked = stop.** If a required input is missing from the CV, do not invent it and do not
  make the product decision - stop and ask the owner.

## Content rules

- **Location** is `Israel` (owner's choice; the CV header says Tel Aviv).
- **Phone** publication is owner-confirmed: `+972 54 237 7256` renders in Contact and on the
  business card. Do not add it anywhere else without asking.
- **Resume URL:** the file lives at repo path `public/resume.pdf` but is served at
  **`/resume.pdf`**. Always link `/resume.pdf`, never `/public/resume.pdf`. Download button
  text is exactly `Download CV`.
- **LinkedIn:** `https://www.linkedin.com/in/maayanpony/`. Strip tracking params (e.g.
  `lipi`) from any LinkedIn URL before storing - they encode a personal token.
- Contact message wording: `Let's Work Together! Have something interesting to work on? Feel
  free to contact me.`
- No count stats (courses / technologies / projects / certificates) are published - the CV
  states none. Do not reintroduce them with made-up numbers.

## Security & privacy (hard rules)

- The volunteering entries involve minors and vulnerable people. Publish **no** participant
  names, institution addresses, photographs, or outcome figures beyond what the CV states.
- The army entry reproduces the CV's own wording and contains no operational or technical
  detail. Keep it that way.
- The resume PDF is public at `/resume.pdf` and contains the owner's phone and personal
  email. Any change to it needs a privacy review before it is committed.
- **No secrets in the repo:** never commit `.env*`, API keys, tokens, private certs
  (`.pem`/`.key`), or internal config. Never disable TLS verification.
- External links: `target="_blank"` requires `rel="noopener noreferrer"`; verify links
  resolve.
- If a tool call is denied by policy, **stop** - report what was denied and ask; do not work
  around it.

## Accessibility & performance baseline

- Semantic landmarks, one `<h1>` per page with logical heading order, full keyboard
  operability, visible focus, AA contrast, alt text, a skip link, `<html lang="en">`, and
  respect `prefers-reduced-motion`.
- Animations are subtle (transform/opacity), cause no layout shift, and are
  disabled/minimized under reduced motion. Do not lazy-load the Hero LCP image.
  Targets: Lighthouse a11y ≥ 95, perf ≥ 90.

## Regenerating the social preview image

`app/opengraph-image.jpg` and `app/twitter-image.jpg` are committed screenshots of the real
Hero, not generated at request time. **Re-run the script after any visual change to the
Hero**, or link previews will show a stale page:

```bash
pnpm build && pnpm exec next start -p 3100
```

```bash
node scripts/generate-og-image.mjs http://localhost:3100/
```

Also update `app/opengraph-image.alt.txt` / `app/twitter-image.alt.txt` if the hero copy
changed.

## Git & PR workflow

- **Branch per change** off an up-to-date `main`.
- **Commit identity:** `Noam Pony <noampong@gmail.com>` - enforced by `.githooks/pre-commit`.
  Verify `git config user.email` before committing.
- **Do not commit or push unless the owner explicitly asks.** Never force-push `main`.
