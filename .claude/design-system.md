# Jacks.se Design System

Design system extracted from **[Rebstorm/jacks.se](https://github.com/Rebstorm/jacks.se)** — Paul Jacks' personal site, blog and "complain-o-sphere", built with Deno + Fresh + Preact and deployed to Deno Deploy.

> "Pauls Dev Page. Add salt for saltiness."

## Sources

| Source | Path / link |
|---|---|
| Codebase | `github.com/Rebstorm/jacks.se` (main, Fresh app) |
| CSS source of truth | `assets/css/base.css` in repo |
| Author | Paul Jacks — paul@jacks.se / paul@paul.wiki |
| Inspiration cited in copy | [MDN](https://developer.mozilla.org/), [Primer](https://primer.style/), [Fresh](https://fresh.deno.dev/) |

No Figma exists — the codebase is the source of truth.

## What this product is

A single personal site with four surfaces:

1. **Home** (`/`) — tiny landing: a confetti-laced intro paragraph, latest blog list.
2. **Blog** (`/blog`, `/blog/[slug]`) — long-form rants and dev notes, rendered from Markdown via `@deno/gfm` with Prism highlighting (TS/Rust/Python).
3. **CV** (`/cv`) — résumé as cards, with company logos.
4. **Experiments** (`/experiments/*`) — interactive toys: Flappy clone, Gravity pinball-ish thing, Battery Rush. Built as Fresh **islands**.

Plus a global wave background and an animated rainbow-gradient page title.

---

## Visual foundations

**Vibe.** Personal-blog-meets-developer-portfolio. Clean GitHub-ish surfaces (`#f6f8fa` light / `#18202c` dark), a single playful primary device (the **moving rainbow gradient** on H1s and `.md > h1`), and a **pure-SVG wave** silhouette pinned behind content. No drop shadows. No gradients on backgrounds — the gradient is a **type-only** treatment, masked through `background-clip: text`. Confetti and emoji peppered through copy.

**Color.** Three working layers + a flavor trio.
- *Surface*: `--background-color` (#f6f8fa light / #18202c dark) and `--secondary-color` for code/chips.
- *Ink*: `--primary-text`, `--secondary-text` (which IS the link color — links are blue, not underlined), `--tertiary-text` for meta.
- *Action*: `--primary-color` (#0366d6) for hover, `--accent-color` (#4073fa) for hover-on-nav background and the skip-link.
- *Flavor* (gradient only): `--flavor-1: #f06` magenta · `--flavor-2: #9f6` lime · `--flavor-3: #f0a` pink. **Never used as solid fills** — only as a 3-stop linear gradient at 45°, animated.

**Type.** **Nunito** — 400 + 700 only — loaded from Google Fonts (woff2 self-declared `@font-face` plus a `<link rel="preload">`). Body sits at `font-size: 18px; font-weight: 300` (note: the body weight is below what Nunito ships, so browsers fake-light it — this is intentional in the source). H1 = `2 * --norm` (2rem). H2 inherits browser default (1.5rem). No display face. No serifs. No mono webfont — `<pre>` falls back to the system mono stack inside a rounded 2rem pill.

**Spacing.** Everything multiplies a single CSS variable: `--norm: 1rem`. The container caps at `calc(var(--norm) * 70)` ≈ 1120px and the nav top padding is `12 * --norm` to push content below the wave. Below 1280px the container becomes 95vw and nav padding shrinks to `4 * --norm`.

**Backgrounds.** Two devices and only two:
1. The **wave** — an inline SVG path tinted with `var(--background-contrast)`, sized 200% wide, positioned absolute at the top, animated `translateX 0 → -50%` over 10s linear infinite. Acts as a giant ink "horizon".
2. **Solid surface** — that's it. No textures, no patterns, no full-bleed photos. Blog post images are inline within content.

**Borders, radii, shadows.**
- `--border: 0.2rem` (~3px) is the default radius (pager, skip-link).
- `<pre>` is heavy: `border-radius: 2rem` — the only obviously rounded element.
- Cards (`.card` in CV) carry **no shadow, no border** in the source — they're padding + an image. (We add a faint surface in the kit recreation; flag below.)
- No box-shadows are used anywhere — the `.nav` originally had one, the source explicitly sets `box-shadow: none`.

**Hover / press.**
- Nav links: hovering swaps the **whole tab background** to `--accent-color` (no opacity tricks, hard color flip).
- `.blog-title:hover` → `--primary-color` (deeper blue).
- `.pager-link:hover` → bg flips to `--accent-color`, text to `--background-color`.
- `.interactable:active` → text to `--accent-color`.
- No transforms. No scale. No box-shadow lifts. **Color-only feedback.**

**Animation.**
- `moveGradient` 3s linear infinite (the rainbow text).
- `wave` 10s linear infinite (the SVG horizon).
- Nav has a `transition: all 500ms ease-in` declared but no obvious property changes — likely vestigial.
- No bounces, no spring physics, no Framer-Motion. Linear easing exclusively.

**Transparency / blur.** None. No `backdrop-filter`, no rgba surfaces. Everything is opaque.

**Layout rules.** Centered single column. `display: flex; flex-direction: column; align-self: center;` on `.container`. Nav is horizontally scrolling on overflow with `::-webkit-scrollbar { display: none }`. The wave + container both sit on `z-index: 2` inside a `.portal` wrapper.

**Imagery vibe.** Blog images are mixed: stock-y `.webp` photos for concept posts, screenshots for tech posts, soft illustrations for some. Color is incidental — no warm/cool grade enforced. Company logos on the CV are **square PNGs at 128px** plus one SVG (SAP).

---

## Content fundamentals

**Voice.** First-person, conversational, slightly self-deprecating, technically opinionated. Paul writes like he's writing to a friend who also reads HN.

**Person.** "I" everywhere. "You" rarely, and only in instructions. The tagline is literally *"Hello, I'm Paul. I code things."*

**Casing.** Sentence case in headings ("What I do", "Hopes and dreams"). Title-case sparingly. No ALL-CAPS shouting. UI labels are emoji-only on the nav (🏡 📒 🧪 🦣).

**Tone.** Dry, warm, lightly grumpy. Self-aware. Playful jargon ("complain-o-sphere", "wopbage"). German pragmatism + Swedish minimalism.

**Examples (verbatim from the codebase):**
- *"Welcome to my personal space on the web — Jacks.se! This is where I share my thoughts, experiences, and yes, occasionally, my rants."*
- *"A software dev with over 10+ years in a wide field of domains. Now available for [projects]."*
- *"That rust gets a more widespread appeal. Thats it."* (yes, missing apostrophe — kept as-is)
- *"This service here was written in Deno 🦕 using Fresh 🍋. Running in Deno Deploy."*
- *"The page you're looking for got eaten by a bug 🐛 — Can you squash it?"* (404)
- Site title key: *"Paul's wopbage 🫠"*

**Emoji usage.** **Yes, heavily.** Specific, intentional, recurring:
- 🏡 home · 📒 blog · 🧪 experiments · 🦣 mastodon (nav)
- 📄 each blog post link
- 📚 MDN · 🎨 Primer · 🍋 Fresh · 🦕 Deno · 🐛 the 404 mascot · 🫠 the title
- They function as **iconography**, not decoration. See ICONOGRAPHY below.

**Punctuation quirks.** En-dashes used in CV ranges. Apostrophes occasionally dropped. `&mdash;` used in HTML. Ampersand-encoded entities visible in source. Genuinely-typed feel.

---

## Iconography

The site has **no icon font, no icon component library, no Lucide/Heroicons import**. Instead it uses three layers in this order:

1. **Emoji as primary iconography.** The entire nav is emoji. Blog post bullets are 📄. Tech stacks in copy use emoji as visual anchors (📚 🎨 🍋 🦕). This is a **deliberate stylistic choice** — emoji ARE the icon system.
2. **One inline SVG component.** `components/github-icon.tsx` — the GitHub octocat as a single hand-crafted SVG path (white fill), 2rem × 2.6rem. That's it. No icon set.
3. **Static asset PNGs/SVGs.** Company logos on the CV (`assets/companies/*`), experiment imagery (drone, bird, battery, gravity-preview), favicon, the site logo SVG. All bitmap-or-static, all just `<img src>`.

**Implication for new work.** When designing for this brand: **lead with emoji**. Reach for an inline SVG only when an emoji would feel wrong (e.g. GitHub mark). Do not introduce a third-party icon library — it would break the voice. If a metaphor genuinely needs a vector glyph, hand-roll one matching the GitHub-icon's flat, single-color, no-stroke style.

We've copied all real assets we have into `assets/`:
- `assets/logo.svg`, `assets/favicon.ico`
- `assets/portrait.jpeg` (Paul, used as og:image)
- `assets/companies/{sap.svg, tibber.png, volvo.png, rd.png, google.png}`
- `assets/experiments/{drone.png, bird.png, gravity-preview.svg, battery.webp}`
- `assets/blog/{codereview.webp, dry.webp, over-engineering.png, concurrency.webp}`

---

## Index

```
Jacks.se Design System
├── README.md                         ← you are here
├── SKILL.md                          ← agent skill manifest
├── colors_and_type.css               ← CSS variables (color, type, spacing)
├── assets/
│   ├── logo.svg, favicon.ico, portrait.jpeg
│   ├── companies/                    ← CV logos (5 brands)
│   ├── experiments/                  ← drone, bird, battery, gravity preview
│   └── blog/                         ← cover images
├── preview/                          ← Design System tab cards
│   ├── colors-*.html
│   ├── type-*.html
│   ├── spacing-*.html
│   ├── components-*.html
│   └── brand-*.html
└── ui_kits/
    └── jacks-se/
        ├── README.md
        ├── index.html                ← interactive recreation of the site
        ├── Wave.jsx, Nav.jsx, GradientHeading.jsx,
        │   Card.jsx, BlogCard.jsx, Pager.jsx, Footer.jsx,
        │   ConfettiParagraph.jsx
        └── screens/{Home,Blog,CV,Experiments,NotFound}.jsx
```

## Caveats / things flagged for the user

- **Nunito is loaded from Google Fonts CDN** (woff2 URLs hardcoded in source). We did not vendor a local copy. If you want offline / fully-bundled fonts, please drop `Nunito-Regular.ttf` and `Nunito-Bold.ttf` into `fonts/` and I'll wire them up.
- **No Figma file** exists for this brand — the codebase is the only design source. Pixel-perfectness comes from CSS, not measurement.
- The CV cards in the source have **no shadow, border, or rounding**. They are visually weak. The UI kit recreation keeps them spec-accurate; if you'd like a stronger card style, that's a deliberate departure to discuss.
- Body weight is `300` in the source even though Nunito is loaded at `400` and `700`. Browsers fake-light. Kept as-is for fidelity.
- Confetti, Babylon.js (gravity experiment) and the Flappy game are mentioned but **not recreated** in the kit — they're product, not design system.
