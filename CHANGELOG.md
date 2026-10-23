# Changelog

All notable changes to the **Warren Victor Portfolio** (`warrenvictor.github.io`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.4] — 2026-10-23

### 🌟 Animated Hero Starfield
- **Twinkling stars:** Added `assets/js/starfield.js` (ES module, under 2 KB minified) drawing a sparse twinkle layer on `canvas.stars` in the hero. Sprite-based, 30 fps cap, DPR capped at 1.5, paused when off-screen or tab hidden.
- **Accessibility:** Static single frame under `prefers-reduced-motion`; stars dimmed behind the headline column.
- **Shooting stars:** Two CSS-only streaks (transform/opacity) firing roughly every 8-15 seconds, disabled under reduced motion.

---

## [1.1.3] — 2026-10-21

### 💎 Official W.V. Logo Implementation
- **Top Navigation Bar Brand Badge:** Replaced temporary text "W.V." badge with the official `WV Logo.svg` rendered inside a pristine circular disc (`w-11 h-11`), featuring hover micro-animations (`group-hover:scale-105`) and crisp contrast against both the dark hero and scrolled navbar.
- **Dynamic Favicon:** Updated the browser tab favicon in `index.html` and `404.html` to load the official vector `WV Logo.svg`.
- **Creative Footer Watermark:** Implemented a large architectural monogram watermark (`.footer-logo-watermark`) in the lower-right background of the footer (`right: -30px; bottom: -30px; width: 420px;`), tilted at `-8deg` with soft opacity (`0.055`) and interactive hover lift (`0.085`, `scale(1.02)`), creating a luxury stationery embossed seal effect without obstructing content.

### 🚀 Hero Scroll & Back to Top Toggle Patch
- **Hero Scroll Widget Removal:** Removed the static scroll prompt widget from the hero section to create an ultra-clean, minimalist hero aesthetic.
- **Back to Top Floating Action Button:** Added an accessible Back to Top toggle button (`#back-to-top` / `.back-to-top-btn`) with glassmorphism styling (`rgba(10, 24, 45, 0.90)`, `backdrop-blur-md`, sky-blue arrow icon) that appears automatically once the page is scrolled past the hero fold (`scrollY > 350px`).
- **Zero Element Overlap Guarantee:** Positioned at `bottom: 24px; right: 28px;` on desktop (comfortably separated by hundreds of pixels from the centered floating social deck) and `bottom: 16px; right: 16px;` on mobile, ensuring zero overlap with any card, text, or floating widget across all breakpoints. Strictly respects `prefers-reduced-motion`.

---

## [1.1.2] — 2026-10-21

### 🧭 Navigation & Footer Minor Patch
- **Top Navigation Bar:** Hidden / removed the CV download button from the top navigation bar to create a cleaner, streamlined navigation layout (CV remains accessible via the dedicated "Download Full CV" CTA button in the About section).
- **Footer Nomenclature Update:** Replaced *"Online Presence"* with *"Digital Footprints"* in the contact & social section card for a more distinctive, modern, and engaging identity presentation.

---

## [1.1.1] — 2026-10-21

### 🩹 Desktop Hero Horizon Layer Patch
- **Zero Gap Horizon Tucking:** Resolved the visible blue background gap between Warren's character cutout photo and the white curved horizon divider on desktop viewports (`1024px` to `1920px+`).
- **Unclipped Vertical Overflow & Anchor:** Configured `#home.hero-navy-gradient` with `overflow: visible !important;` on desktop while maintaining `overflow-x: hidden` globally, preventing lower torso clipping.
- **Responsive Downward Offset & Scale:** Applied responsive portrait wrapper offsets (`translateY(72px)` on `lg:`, `translateY(84px)` on `xl:`) and expanded max-heights (`680px` on `lg:`, `740px` on `xl:`), guaranteeing that his jeans and waist tuck seamlessly behind the white horizon curve across all desktop display heights (800px, 900px, 1080px).

### 🔍 Typography & Spacing Major Reaudit
- **Reaudit Verification & Fixes:** Conducted an end-to-end audit verification across the entire page, confirming full alignment with the v1.1.0 editorial typography scale.
- **Token Compliance:** Confirmed 0 arbitrary spacing violations—all layout margins and padding strictly follow the 8px grid (`mb-2`, `mb-4`, `mb-6`, `mb-8`, `mb-16`, `gap-2`, `gap-4`).
- **Hierarchy Preservation:** Verified `.editorial-lead` (`1.125rem` / `1.25rem`, `font-weight: 500`) in About, `text-left` body paragraph alignment across all sections, `text-2xl` project category headers over `text-xl` project cards, and `text-xs uppercase font-semibold text-slate-500` contact labels.

---

## [1.1.0] — 2026-10-21

### 🌌 Hero Section Redesign
- **Navy Ambient Canvas:** Introduced an all-navy theme with an organic 24-second ambient flowing gradient (`#071526` → `#0d223c` → `#153359` → `#1a3f6f` → `#0a1b32`) with radial glow accents.
- **Architectural 3-Column Layout:**
  - *Left Column:* Eyebrow pill badge, pure white Playfair Display headline, value proposition statement (*"Accessibility is a right"*), and dual CTA buttons.
  - *Center Column:* Transparent vector SVG portrait of Warren Victor, vertically anchored to the bottom edge.
  - *Right Column:* 4 Frosted Sapphire glass competency cards (*Information Services, Web & Graphic Design, Educational Technology, Creative Solutions*) with interactive hover states.

### 🌅 Section Transition Fix & Glide Effect
- **Upward Curved Horizon Divider:** Created a custom architectural SVG bezier curve (`.hero-horizon-divider`) with responsive negative margins (`-56px` mobile, `-84px` tablet, `-120px` desktop) that arches up beneath Warren's torso, seamlessly merging into the clean white About section.
- **Depth Layering & Waist Tucking:** Layered the portrait at `z-index: 10` behind the white horizon curve (`z-index: 20`), allowing his waist and jeans to naturally tuck behind the curve and completely eliminating the hard scissor cut.
- **Scroll Glide Parallax:** Implemented a lightweight `requestAnimationFrame` parallax effect in `assets/js/main.js` (`glideOffset = scrollY * 0.12`) that glides the white horizon upward over the portrait as the user scrolls, strictly respecting `prefers-reduced-motion`.
- **Interactive Scroll Glide Prompt:** Positioned an accessible interactive scroll prompt (`.hero-scroll-glide`) in the bottom-right corner that triggers a smooth glide down to `#about` when clicked.

### ✍️ Typography & 8px Grid Spacing Audit
- **8px Grid Normalization:** Replaced arbitrary values (`mb-1`, `mb-3`, `gap-3.5`, `mt-0.5`, `px-3.5 py-1.5`, `text-[11px]`) with standardized 8px grid tokens (`8px`, `16px`, `24px`, `32px`, `48px`).
- **Editorial Lead Paragraph:** Implemented `.editorial-lead` in `assets/css/styles.css` (`font-size: 1.125rem` / `1.25rem`, `font-weight: 500`, `line-height: 1.75`), providing an engaging visual entry into the Professional Summary.
- **Left-Alignment Rhythm:** Converted body paragraphs from `text-justify` to natural left-alignment (`text-left`), eliminating awkward word spacing and rivers of white space across responsive viewports.
- **Card Hierarchy Harmonization:**
  - Elevated About right-column cards (*Core Competencies*, *Certifications*) from `text-xl` to `text-2xl font-serif`.
  - Elevated Project Category Headers to `text-2xl md:text-3xl font-serif font-bold`, establishing clear parent hierarchy over individual `text-xl` project card titles.
- **Contact Section Styling:** Added a matching navy accent line (`w-20 h-1 bg-navy-600 rounded-full mb-6`) beneath *"Let's Connect"*, and upgraded email metadata labels to `text-slate-500 font-semibold text-xs uppercase tracking-wider` for WCAG AA contrast compliance.

---

## [1.0.2] — 2026-10-21

### 🖼️ Hero Photo Update
- **Clean Background Cutout:** Replaced hero section photo with the clean, transparent background SVG asset from `references/Warren Victor Photo (1).svg` to `assets/img/Warren Victor Photo.svg`.
- **Cache-Busting Update:** Updated hero image reference in `index.html` (`?v=3`) to ensure immediate rendering across browsers.

---

## [1.0.1] — 2026-10-20

### 🎨 Theme Preservation & Architecture
- **Preserved Default Theme:** Archived complete v1.0.0 "Deep Sapphire Glassmorphism" into `themes/theme-sapphire-glass/` with design tokens, component styles, tailwind config, and pre-compiled stylesheet backups.
- **Theme Switching Utilities:** Added cross-platform theme switcher scripts (`scripts/switch-theme.py` and `scripts/switch-theme.js`) to allow 1-click theme restoration and new theme saving directly in the code editor.
- **Build Utilities:** Added `scripts/build-css.py` for automated CSS minification and bundling.
- **Documentation:** Added master `THEMES.md` and `themes/README.md` detailing all design tokens, color codes, and manual copy-paste reversion steps.

---

## [1.0.0] — 2026-10-20

### 🚀 Initial Public Release

This is the first official release of Warren Victor's professional online portfolio, deployed live to GitHub Pages at [https://warrenvictor.github.io](https://warrenvictor.github.io).

### ✨ Added
- **Semantic HTML5 Architecture:** Clean, accessible page structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- **Glassmorphism Design System:** Custom theme with dark gradient background (`#0f172a` → `#1e3a8a` → `#0f172a`), 12px blur backdrop filters, and sky-blue accent (`#0ea5e9` / `#0369a1`).
- **Typography:** Playfair Display for editorial headings and Inter for readable body text.
- **Featured Firebase Web Applications:**
  - *Benilde Antipolo Research Repository* — Digital archive & search portal for academic manuscripts.
  - *Audio-Visual Services Portal* — Reservation and real-time equipment tracking system.
  - *Polly Match Mania 2026* — Interactive kiosk memory game for Library & Information Services Month (LISM).
- **Managed Platforms & Creative Media:**
  - *CLR Antipolo Official Website* — Curated Springshare LibGuides portal.
  - *Benilde Antipolo CLR Social Media* — Official Facebook page and creative digital communications.
- **CV Download:** Download button linking directly to verified, sanitized CV PDF (`assets/Warren-Victor-CV.pdf`).
- **Mobile Navigation:** Responsive hamburger toggle menu with smooth transition, keyboard accessibility (`Escape` key), and outside click closing.
- **Custom 404 Error Page:** Styled `404.html` matching site glassmorphism, with dynamic SVG favicon and high-contrast navigation link.
- **SEO & Social Cards:** Comprehensive Open Graph (OG) tags, Twitter summary card, theme-color meta, and dynamic inline SVG favicon.

### ⚡ Performance & Quality (Lighthouse Scores)
- **Performance (91/100):** Sub-2s First Contentful Paint, modern WebP headshot (`assets/img/warren-victor-headshot.webp`, 94.5% file reduction), preloaded non-render-blocking web fonts.
- **Accessibility (100/100):** WCAG AA color contrast compliance, skip-to-content navigation, explicit `:focus-visible` styling, comprehensive ARIA labels, and `prefers-reduced-motion` animation suppression.
- **Best Practices (100/100):** Strict doctype, valid HTTPS links with `rel="noopener noreferrer"`, no deprecated APIs.
- **SEO (100/100):** Valid meta descriptions, semantic landmark hierarchy, crawlable navigation links.

### 🔒 Privacy & Security Compliance
- Zero mobile phone numbers and zero physical street addresses across the entire public repository.
- Only official contact emails permitted: `warren.victor@antipolo.benilde.edu.ph` and `warrenvictordesign@gmail.com`.
- `references/` source directory git-ignored and safeguarded from deployment.
