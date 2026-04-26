---
name: jacks-se-design
description: Use this skill to generate well-branded interfaces and assets for Jacks.se (Paul Jacks' personal site, blog and experiments), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read `.claude/design-system.md` for the full brand context, then explore the repo as needed.

Key files in this repo:
- `.claude/design-system.md` — brand context, content fundamentals, visual foundations, iconography
- `assets/css/base.css` — CSS variables (color, type, spacing) — the source of truth; copy or @import for any new artifact
- `static/logo.svg`, `static/favicon.ico` — brand marks
- `static/companies/` — CV company logos (sap, tibber, volvo, rd, google)
- `static/experiments/` — experiment imagery (drone, bird, gravity preview, battery)
- `static/blog-images/` — blog cover images
- `components/` — Wave, GradientHeading (h1), FontLink, GithubIcon
- `islands/` — Header, Footer, and interactive islands
- `routes/` — page layouts and route handlers

Cardinal rules for this brand:
1. **Emoji ARE the icon system.** Reach for emoji before SVG. Do not import Lucide/Heroicons.
2. **The rainbow gradient is type-only.** `linear-gradient(45deg, #f06, #9f6, #f0a)` clipped to text, animated with `moveGradient`. Never use as a background fill.
3. **Hover = hard color flip.** No opacity tricks, no transforms, no shadows.
4. **One typeface: Nunito** at 400/700. Body sits at weight 300 (browsers fake-light it — intentional).
5. **The wave is the only background ornament.** A `var(--background-contrast)` SVG horizon, animated 10s linear infinite.
6. **Voice is first-person, dry, lightly grumpy, German-Swedish-pragmatic.** "I", not "we" or "you".

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
