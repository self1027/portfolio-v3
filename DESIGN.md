# Portfolio design guidance

## Context

Murilo Dias's backend developer portfolio presents production projects, technical decisions and professional experience. Keep the content readable and make project details and contact actions easy to find.

## Existing visual language

The source of truth for current tokens is `src/index.css`:

- Light theme: warm off-white background, white surfaces and dark text.
- Dark theme: near-black background with layered dark surfaces.
- Amber primary accent and cyan secondary accent.
- Inter/system sans-serif for interface text; JetBrains Mono/system monospace for code.
- Shared semantic CSS variables for color, borders, surfaces and code blocks.

Reuse existing tokens and components. Preserve both themes and both supported languages. Do not replace the visual identity merely to match an external example.

## Working principles

Use Taste Skill for deliberate hierarchy, spacing, typography and composition. Use Web Design Guidelines for semantics, focus, keyboard access, responsive behavior and motion accessibility. Review existing pages before proposing visual changes.

## External design references

The user selected these resources for this project:

- Taste Skill: https://www.tasteskill.dev/ — installed in `.agents/skills/taste-skill/`.
- Vercel Web Design Guidelines: https://github.com/vercel-labs/agent-skills/tree/main/skills/web-design-guidelines — installed in `.agents/skills/web-design-guidelines/`.
- Awesome DESIGN.md: https://github.com/voltagent/awesome-design-md — a collection of brand-specific design documents, not an installable skill.

Reference read for this redesign: [Vercel analysis from Awesome DESIGN.md](https://github.com/voltagent/awesome-design-md/blob/main/design-md/vercel/DESIGN.md). Adapt its readable sans-serif hierarchy, tonal surface changes and direct actions to this portfolio. The portfolio keeps its own amber/cyan palette and existing typefaces. Do not import Vercel's identity, gradients or decorative labels.

## Recruiter-focused direction

Taste direction: **Type and nothing else**, seed `438053253`. The first screen names Murilo and his backend specialization; the evidence follows through real project screenshots and readable case studies. The hero was redrawn once because the original cropped-name composition conflicted with legibility and the requirement to keep the role and resume visible on mobile.

- Lead with Node.js, TypeScript and the real municipal application, without a fictional code profile or seniority claims.
- Present Livro first, then the audio, browser-concurrency and authoritative-server projects. Each project explains a different engineering decision.
- Keep experience before skills. Link demonstrated skills to the relevant case sections; keep supplementary technologies separate from project evidence.
- Use full-width tonal sections, generous spacing and native text. Avoid repeated bordered cards, decorative monospace and redundant badges.
- Contact uses a real email action, copy feedback and LinkedIn. The previous form only opened an email client.
- Respect reduced motion. Reveals enhance the ordinary experience without withholding information when animation is disabled.
- Preserve complete case-study content, both resumes, both languages, both themes and direct project URLs, including NoBSDownloader.

## Content integrity

The source data supplies the experience and project claims; no employers, testimonials, user counts, benchmarks or seniority levels were invented. Livro's lookup estimate describes a paper-to-digital workflow, not an isolated SQL benchmark. ASCII's frame-rate claim is qualified by hardware and resolution. Unique constraints, process supervision and subprocesses must not be described as legal validity, zero downtime or sandbox guarantees.

See `docs/portfolio-review.md` for review decisions, validation and remaining limits.
