# Changelog

All notable changes to the **Warren Victor Portfolio** (`warrenvictor.github.io`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
