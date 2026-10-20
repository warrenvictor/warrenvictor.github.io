# AGENTS.md — Warren Victor Portfolio

## Project Overview
This is a static professional portfolio website for Warren Victor, deployed to GitHub Pages at `https://warrenvictor.github.io`.

## Rules

### Privacy — CRITICAL
- **NEVER** include a mobile phone number or home address anywhere in the codebase.
- Only the following contact emails may appear:
  - `warren.victor@antipolo.benilde.edu.ph`
  - `warrenvictordesign@gmail.com`
- The `references/` directory is git-ignored and must never be committed.

### Content Accuracy
- Do not invent or fabricate any biographical facts, dates, titles, or credentials.
- All content must be sourced from `references/Index.txt` or `references/Resume Warren Victor.pdf`.
- If unsure about a fact, mark it with a `<!-- TODO: verify -->` comment and ask the user.

### Design System
- **Background:** Dark gradient (`#0f172a` → `#1e3a8a` → `#0f172a`), `background-attachment: fixed`
- **Glass panels:** `rgba(255,255,255,0.05)` background, `blur(12px)`, `1px solid rgba(255,255,255,0.1)`
- **Accent color:** Sky-blue `#0ea5e9` (brand), dark variant `#0369a1`
- **Fonts:** Playfair Display (headings), Inter (body)
- **Icons:** Font Awesome 6
- Use CSS custom properties (`--color-*`) for all colors.
- Use an 8px grid system for spacing.
- All animations must respect `prefers-reduced-motion`.

### Technology
- Plain static HTML/CSS/JS only. No frameworks, no backend, no secrets.
- Tailwind CSS is compiled at build time; the CDN script must not appear in production.
- Keep all assets local (images, CSS, JS) — no external dependencies except Google Fonts and Font Awesome CDN.

### Accessibility
- Use semantic HTML 5 elements (`<header>`, `<main>`, `<nav>`, `<section>`, `<footer>`, `<article>`).
- All images must have descriptive `alt` text.
- Include a skip-to-content link.
- Provide visible `:focus-visible` styles on all interactive elements.

### File Organization
```
index.html          — Main portfolio page
404.html            — Custom error page
assets/css/         — Stylesheets
assets/js/          — Scripts
assets/img/         — Images
references/         — Source files (git-ignored)
```
