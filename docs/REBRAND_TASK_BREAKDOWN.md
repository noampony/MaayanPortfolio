# Portfolio Rebrand: Task Breakdown

## 0. Prerequisites
- [ ] Get the new person's approval/sign-off to reuse this codebase (per AGENTS.md confidentiality rules, any Check-Point-specific experience entries must NOT carry over unless independently reviewed for the new person).
- [ ] Collect source materials from the new person: bio, headshot, resume PDF, LinkedIn URL, project list, course/certificate list, employer logos (with usage rights), contact details.

## 1. Identity & Metadata
- [ ] `package.json` → rename `"name": "noam-pony-portfolio"` to new slug.
- [ ] `app/layout.tsx` → update `<title>`, `metadata.title/description`, OpenGraph `title/description`, `metadataBase` URL.
- [ ] `components/seo/StructuredData.tsx` → update JSON-LD (`Person` name, jobTitle, url, sameAs links).
- [ ] `app/` favicon/OG image assets → replace with new person's branding (or generic placeholder if none supplied).
- [ ] `README.md` → update project title/description if it references Noam.

## 2. Content Data Layer (`lib/content/data/`)
- [ ] `profile.ts` - name, title/role, location, bio/tagline, social links (LinkedIn - strip tracking params).
- [ ] `about.ts` - bio copy, highlights/stats.
- [ ] `experience.ts` - replace each entry; re-apply the `confidentialityReviewed` gate per new employer's rules - do not flip to `true` without explicit sign-off.
- [ ] `resume.ts` - update any resume-related copy/labels.
- [ ] `contact.ts` - email, socials, contact message copy (keep or restyle the "Let's Work Together!" line as the new person prefers).
- [ ] `businessCard.ts` - name, title, contact details for the business-card component (Phase 14, if in use).
- [ ] Projects data (wherever it's sourced - check `lib/content/loaders.ts`/`types.ts` for a `projects` source) - replace with new person's projects; drop the "10+" placeholder rule and use their real count or omit.
- [ ] Courses/skills data - replace with new person's actual courses, certs, and tech stack; recompute counts (don't hardcode "35 courses" or "18+ technologies" unless true for the new person).
- [ ] `lib/content/types.ts` / `validate.ts` - sanity-check schema still fits new data shape (should be unchanged if data conforms).

## 3. Static Assets (`public/`)
- [ ] `profile.png` - new headshot.
- [ ] `resume.pdf` - new resume (privacy-review before committing, per AGENTS.md).
- [ ] `contact-avatar.png` - new avatar image.
- [ ] `logo.png` / `logo-mark.png` - new personal logo/wordmark (or generic monogram).
- [ ] `certificates/*.pdf` - replace `noam-pony-*` files with new person's certificates (or remove section if none).
- [ ] `courses/*.png|webp` - replace/prune to match new person's actual courses.
- [ ] `logos/*` - replace employer/institution logos (`check-point.svg`, `academic-college-tel-aviv-yaffo.svg`, etc.) with the new person's actual employers/schools, respecting logo usage rights.
- [ ] `images/projects/*` - replace with new project screenshots/covers.

## 4. Component-Level Text Checks
- [ ] `components/sections/Hero.tsx` / `HeroContent.tsx` - verify no hardcoded name/copy outside the content layer.
- [ ] `components/sections/Contact.tsx`, `ResumeViewer.tsx`, `FloatingCode.tsx` - check for hardcoded strings (e.g. floating code snippets, easter eggs) referencing Noam/Check Point.
- [ ] `components/layout/Navbar.tsx`, `MobileNav.tsx`, `Footer.tsx`, `Logo.tsx` - verify site name/initials/footer copyright pull from content layer, not hardcoded.
- [ ] `components/ui/ExperienceLedger.tsx`, `components/business-card/FloatingCard.tsx` - confirm purely data-driven (no hardcoded name).
- [ ] Grep for stray literals: `grep -rniE "noam|pony|checkpoint|check point|linkedin.com/in/noam" app components lib --include="*.tsx" --include="*.ts"`.

## 5. Domain / Deploy Config
- [ ] Update `siteUrl` / canonical domain used in metadata (Vercel project + custom domain, if any).
- [ ] Update Vercel project name/env vars if this becomes a separate deployment rather than a repo fork.
- [ ] `.idea` / editor config - no action needed (local only, not shipped).

## 6. Non-Negotiable Rules to Re-Verify for the New Person
- [ ] Location field, years-of-experience start date, stats counts (courses/certs/projects/technologies) are all real numbers for the new person - no placeholders.
- [ ] Any work experience entries are confidentiality-reviewed for their actual employer before publishing.
- [ ] Resume PDF privacy-reviewed.
- [ ] All external links (`target="_blank"` + `rel="noopener noreferrer"`) still resolve for the new URLs.

## 7. Verification (Definition of Done)
- [ ] `pnpm build`, `pnpm lint`, `pnpm type-check` all pass.
- [ ] Manual browser check: no leftover "Noam Pony" / Check Point references anywhere (Hero, About, Experience, Contact, footer, page `<title>`, OG preview).
- [ ] Responsive check at mobile/tablet/desktop.
- [ ] No broken links, no console errors, a11y baseline intact.
