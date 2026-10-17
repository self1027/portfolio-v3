# Project instructions

## Frontend skills

For frontend work in this repository, read the relevant locally installed skills before editing:

- `.agents/skills/taste-skill/SKILL.md` (`design-taste-frontend`): visual direction, typography, composition, responsive design and visual review for this portfolio.
- `.agents/skills/web-design-guidelines/SKILL.md`: accessibility and interface review. Fetch the current guidelines from its source URL before each review. When reviewing this project without a narrower scope, use `src/` and `index.html`.

Read `DESIGN.md` before changing the interface. User requirements and the existing project context take priority over generic stylistic defaults. Installing skills alone does not authorize a redesign.

## Project checks

- Stack: React, TypeScript, Vite, Tailwind CSS and Motion.
- Type check: `npm run lint`.
- Production build: `npm run build`.
- Browser regression check: start `npm run preview -- --host 127.0.0.1 --port 4173` after building, then run `node scripts/check-portfolio.mjs http://127.0.0.1:4173`. Requires Node 22+ and installed Chrome/Edge; uses the locally installed Taste Skill driver.
- Preserve Portuguese and English translations, light and dark themes, project routes and case studies.
- For visual changes, check desktop and mobile layouts and keyboard interaction. Report any checks that could not be run.
