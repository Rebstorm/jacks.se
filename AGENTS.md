# AGENTS.md

Personal blog + dev site (jacks.se) by Paul Jacks. Deno + Fresh 2 + Preact, deployed to Deno Deploy (project `paul-homepage`).

## Commands

- `deno task dev` - start the dev server
- `deno task check` - fmt + lint + typecheck. Run this after any change; it must pass.
- `deno task build` - production build. Run this after touching `routes/` or `islands/`.
- `deno task db:run` - run the KV CLI in `server/cli/db.ts`

There is no test suite. `deno task check` + `deno task build` is the whole bar.

## Git

- Never commit under any identity other than the user's. Use the name and email already configured in git; do not override them.
- Do not add `Co-Authored-By` lines or any AI attribution to commit messages.

## Blog posts

- Posts live in `static/posts/<slug>.md`. Loaded by `server/post/post.ts`, which requires front matter with `title`, `published_at` (ISO date), and `snippet`. `image` is optional.
- Cover images go in `static/blog-images/`. Reference them as `../blog-images/<file>.webp`.
- Internal links are absolute paths: `/blog/<slug>`.
- When adding a post, sanity check: front matter keys present, `published_at` is a valid ISO date, the slug in the filename matches any `/blog/` links pointing at it, and any image path actually exists.

## Voice

First person, dry, lightly grumpy. Emoji are the icon system; do not import icon libraries for post content.

- No em dashes or en dashes. Use commas, colons, or parentheses.
- End with a short sign-off: `Signing out!` then `Paul`.

## Deploy

`.github/workflows/deploy.yml` only triggers on pushes to the `ignore-me` branch. Pushing to `main` does NOT deploy. If a change should go live, push to `ignore-me` (or run deployctl manually).

## Design

Before touching UI, read `.claude/design-system.md`. `assets/css/base.css` is the source of truth for colors, type, and spacing. There is no Figma; the codebase is the design system.

## Structure

- `routes/` - page components and route handlers (blog, cv, experiments, api)
- `islands/` - interactive Preact components (Fresh islands)
- `server/` - post loading, KV, CLI
- `static/` - markdown posts, blog images, experiment assets
- `assets/css/` - site CSS