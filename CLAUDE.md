# CLAUDE.md

Project instructions for Claude Code. The full guidance lives in **[AGENTS.md](AGENTS.md)**
(kept as the single source of truth so it works across tools). It is imported below.

@AGENTS.md

## Entry points

- **Content source of truth:** the CV at `public/resume.pdf`
- **Content data layer:** [lib/content/data/](lib/content/data/) - validated in
  [lib/content/validate.ts](lib/content/validate.ts), self-checked at build time in
  [lib/content/build-validation.ts](lib/content/build-validation.ts)
- **Homepage sections:** [app/page.tsx](app/page.tsx) →
  [components/sections/](components/sections/)
- **Rebrand status & remaining items:**
  [docs/REBRAND_TASK_BREAKDOWN.md](docs/REBRAND_TASK_BREAKDOWN.md)

Do not invent facts the CV does not state. See AGENTS.md for the full rules.
