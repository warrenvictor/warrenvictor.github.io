# Warren Victor — Professional Portfolio (v1.1.0)

> **Live Production Site:** [warrenvictor.github.io](https://warrenvictor.github.io)  
> **Repository:** [github.com/warrenvictor/warrenvictor.github.io](https://github.com/warrenvictor/warrenvictor.github.io)

A modern, fast, and accessible static portfolio website for **Warren Victor** — Library Professional, Digital Experience Designer, and Adobe Creative Educator based in Cainta, Rizal, Philippines.

---

## 🌟 Key Architectural Features (v1.1.0)

- **Dynamic Ambient Hero Canvas:** Deep sapphire flowing gradient (`#071526` → `#153359` → `#0a1b32`) with an architectural 3-column layout (Headline & CTAs left, centered portrait cutout, 4 Frosted Sapphire glass competency cards right).
- **Upward Curved Horizon Divider:** A custom SVG bezier divider (`.hero-horizon-divider`) that arches beneath the hero portrait, seamlessly connecting the dark hero canvas to the clean white About section with zero hard cuts.
- **Scroll Glide Parallax:** Performance-optimized `requestAnimationFrame` scroll parallax on the portrait with an interactive scroll indicator, strictly respecting `prefers-reduced-motion`.
- **Editorial Typography Scale:** Playfair Display (headings) paired with Inter (body), featuring an `.editorial-lead` paragraph style, left-aligned typographic rhythm, and strict 8px grid compliance.

---

## 🏆 Lighthouse Audit Scores

Audited with Google Lighthouse under production conditions:

| Category | Score | Rating |
|:---------|:-----:|:------:|
| **Performance** | **91** / 100 | 🟢 Fast (Sub-2s FCP, zero main thread blocking) |
| **Accessibility** | **100** / 100 | 🟢 Perfect (WCAG AA compliant, keyboard navigable) |
| **Best Practices**| **100** / 100 | 🟢 Perfect (Modern standards, secure links) |
| **SEO** | **100** / 100 | 🟢 Perfect (Semantic landmarks, Open Graph cards) |

---

## 💻 Tech Stack

| Technology | Purpose |
|:-----------|:--------|
| **HTML 5** | Semantic structure (`<header>`, `<main>`, `<nav>`, `<article>`, `<footer>`) |
| **CSS 3** | Custom design tokens, dark glassmorphism, responsive animations |
| **Vanilla JavaScript** | Navbar scroll states, mobile menu toggle, scroll reveal animations |
| **Tailwind CSS v3** | Compiled locally with CLI into minified production stylesheet (no CDN) |
| **Google Fonts** | Playfair Display (headings) + Inter (body), preloaded |
| **Font Awesome 6** | Vector iconography |
| **GitHub Pages** | Fast global static CDN hosting |

---

## 📂 Project Structure

```
warrenvictor.github.io/
├── index.html                  # Main portfolio single-page application
├── 404.html                    # Custom styled 404 error page
├── assets/
│   ├── Warren-Victor-CV.pdf    # Sanitized CV document for download
│   ├── css/
│   │   ├── main.min.css        # Unified minified production stylesheet (Tailwind + Custom)
│   │   ├── styles.css          # Design system tokens, glassmorphism & keyframes
│   │   └── input.css           # Tailwind base & utilities source
│   ├── js/
│   │   └── main.js             # Mobile nav toggle, scroll effects & observers
│   └── img/
│       ├── warren-victor-headshot.webp  # High-efficiency WebP headshot (21.8 KB)
│       ├── warren-victor-headshot.png   # PNG fallback image
│       └── og-image.jpg                 # Open Graph social sharing card
├── themes/                     # Preserved theme presets library
│   ├── active-theme.json       # Active theme tracking file
│   └── theme-sapphire-glass/   # PRESERVED v1.0.0 Default Theme
├── scripts/                    # Build & theme management tools
│   ├── switch-theme.py         # Python theme switcher & preservation tool
│   ├── switch-theme.js         # Node.js theme switcher & preservation tool
│   └── build-css.py            # Automated stylesheet minifier and bundler
├── references/                 # Source reference material (git-ignored, never committed)
├── THEMES.md                   # Master theme design tokens & switching guide
├── README.md                   # Project documentation
├── CHANGELOG.md                # Release version history
├── AGENTS.md                   # AI pair-programming rules & constraints
├── CONTRIBUTING.md             # Contribution guidelines
├── LICENSE                     # MIT License
└── .gitignore                  # Git exclusions (privacy protection)
```

---

## 🚀 How to Update Your Portfolio

### 1. Standard Content Updates (Most Common)
For text edits, project links, or replacing your CV PDF:

```bash
git add .
git commit -m "Update portfolio content"
git push
```
GitHub Pages automatically deploys the update within 30–60 seconds.

### 2. Rebuilding Tailwind CSS (If Adding New Utility Classes)
```bash
# Recompile and minify Tailwind
npx -y tailwindcss@3 -i ./assets/css/input.css -o ./assets/css/tailwind.min.css --minify

# Merge into production stylesheet
python scripts/build-css.py

# Commit and push
git add .
git commit -m "Style updates"
git push
```

### 3. Theme Preservation & Switching
The original design is permanently preserved as **Deep Sapphire Glassmorphism** in `themes/theme-sapphire-glass/`.

To manage themes in your code editor terminal:
```bash
# List all themes and check active status
python scripts/switch-theme.py list

# Revert to the original Deep Sapphire Glass theme anytime
python scripts/switch-theme.py apply sapphire-glass

# Save a new theme you created
python scripts/switch-theme.py save <new-theme-name> "Description"
```
*(Node.js users can equivalently use `node scripts/switch-theme.js`).*

See [THEMES.md](THEMES.md) for full design tokens, color swatches, and zero-terminal manual steps.

---

## ✅ Completed Milestones (v1.0.0)

- [x] **Phase 1 — Project Scaffolding:** Clean static file structure, MIT License, privacy-first `.gitignore`.
- [x] **Phase 2 — Content Audit & Accessibility:** Accurate dates, location, 6 certifications, mobile hamburger menu, ARIA landmarks, skip-link.
- [x] **Phase 3 — Live Projects & Platforms:** Integrated 3 Firebase web apps, 2 managed platforms, and CV download button.
- [x] **Phase 4 — Production Polish:** Replaced Tailwind CDN with compiled CSS, optimized WebP assets, achieved 91+ Performance and 100/100 Accessibility, Best Practices, and SEO.
- [x] **Phase 5 — Deployment:** Live on GitHub Pages at `https://warrenvictor.github.io`.

---

## 🔒 Privacy Guarantee

⚠️ The `references/` directory is git-ignored and must **never** be committed. It contains reference resumes with private mobile numbers and personal data that must remain confidential.

---

## 📄 License

[MIT](./LICENSE) © 2026 Warren Victor. All Rights Reserved.

