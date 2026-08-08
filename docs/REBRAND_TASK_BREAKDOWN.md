# Portfolio Rebrand: Shani Penkar → Maayan Pony

Status of the rebrand of this codebase from its original owner to **Maayan Pony**
(Electrical & Electronics Engineering B.Sc. student, HIT). Source of truth for all published
content is the CV at `public/resume.pdf`.

## 1. Identity & Metadata — done

- [x] `package.json` name → `maayan-portfolio`
- [x] `app/layout.tsx` → title, description, OpenGraph, Twitter, `siteName`
- [x] `components/seo/StructuredData.tsx` → JSON-LD `Person` / `WebSite`
- [x] `app/icon.svg` favicon + `public/site-logo-mark.svg` → new "MP" monogram
      (the old `SP` PNGs are deleted; `Logo.tsx` renders the SVG via a plain `<img>`
      because `next/image` rejects SVG sources by default)
- [x] `app/opengraph-image.jpg` / `app/twitter-image.jpg` + their `.alt.txt` files regenerated
- [x] `README.md`, `AGENTS.md`, `CLAUDE.md`

## 2. Content data layer (`lib/content/data/`) — done

- [x] `profile.ts` — name, title, hero copy, location, main fields
- [x] `about.ts` — professional summary, HIT B.Sc., Ein-Kerem High School
- [x] `experience.ts` — HIT Electro-Optics Lab research assistantship, IAF service
- [x] `contact.ts` — email, LinkedIn, phone (owner-confirmed for publication), location
- [x] `projects.ts` — Capstone, Microcontrollers Lab, Semiconductors Lab
- [x] `skills.ts` — Programming & Tools / Lab & Instrumentation / Engineering Knowledge / Soft Skills
- [x] `impact.ts` — repurposed to **Volunteering & Community** (5 CV entries)
- [x] `businessCard.ts` — tagline
- [x] `resume.ts` — already pointed at the new CV
- [x] `courses.ts` + `learning-paths.ts` — **deleted** (previous owner's 35 Udemy courses;
      the homepage never rendered them)

## 3. Model / validator changes — done

- [x] `technologiesCountLabel` / `coursesCountLabel` made optional, and the hardcoded
      `"35"` / `"18+"` pins removed from `validateAboutStats`
- [x] `AboutEducation.degreeCertificate` made optional; the ledger renders no action row when
      an entry has no certificate, instead of a trigger that opens an empty viewer
- [x] `build-validation.ts` — course assertion dropped, impact-count assertion relaxed from
      "exactly 9" to a 3–9 range
- [x] `buildExperienceLedger` — roles and education now sort into **one** reverse-chronological
      stream. Previously education was always appended last, which put the ongoing 2022 degree
      *below* the 2019–2021 army entry while the row numbers claimed oldest-at-bottom.

## 4. Static assets — done

- [x] `profile.png` + `contact-avatar.png` → new headshot (was `Subject.png`, now removed)
- [x] `public/certificates/` — deleted (previous owner's degree / Dean's List / bootcamp PDFs)
- [x] `public/courses/` — deleted (29 course cover images)
- [x] `public/logos/` — deleted (Kiloma + Academic College of Tel Aviv-Yaffo)
- [x] `public/images/` — deleted, including `card-bg.png`, which was a screenshot of one of
      the previous owner's apps and was rendering behind every project card

## 5. Component copy — done

- [x] Hero: rotating subtitle + the three profile tags (GPA 95 / Lab Research Assistant /
      B.Sc), which are now static CV facts rather than a clock-derived "years of experience"
- [x] Hero tag glass fill raised so the labels stay legible where the pills overhang the
      (much darker) new portrait
- [x] Experience intro lead · Projects heading + lead · Skills lead and category layout
- [x] `Impact` section → `Volunteering & Community`, including the `#impact` → `#volunteering`
      anchor and the nav label

## 6. Outstanding

- [ ] **Confirm the army entry may name the Patriot unit publicly.** It reproduces the CV's
      own wording and carries no operational detail, but it is the one entry worth a second
      look before the site goes live.
- [ ] **Confirm the capstone partner (Animal Health Technology Labs) may be named**, and
      decide how much of the project to describe once it is further along.
- [ ] **Privacy-review `public/resume.pdf`** — it is served publicly and contains the phone
      number and personal email.
- [ ] Institution logos: HIT and Ein-Kerem currently fall back to initials markers
      (`HIT`, `EKH`). Drop licence-cleared SVGs into `public/logos/` and set
      `institutionLogo` in `about.ts` to use real logos.
- [ ] Certificates: no PDFs are wired. Add any (degree, Excellent Soldier) to
      `public/certificates/` and reference them from `about.ts` / `experience.ts`.
- [ ] Project artwork: cards render on plain glass. Add images under
      `public/images/projects/` and register them in `PROJECT_BACKGROUNDS`.
- [ ] Deploy config: set `NEXT_PUBLIC_SITE_URL` (or attach the domain in Vercel) so canonical
      URLs and OG image URLs resolve to production rather than `localhost`.

## 7. Verification

- [x] `pnpm build`, `pnpm lint`, `pnpm type-check` all pass
- [x] No browser console errors
- [x] Rendered content checked against the CV at desktop (1280) and mobile (390)
- [x] `grep -rniE "shani|penkar|kiloma"` over `app/ components/ lib/ public/` is clean
