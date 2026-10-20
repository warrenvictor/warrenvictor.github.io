# Warren Victor — Professional Portfolio

> **Live site:** [warrenvictor.github.io](https://warrenvictor.github.io)

A static portfolio website for **Warren Victor** — library professional, graphic designer, and Adobe Creative Educator based in the Philippines.

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| HTML 5 | Semantic structure |
| CSS 3 | Styling with CSS variables, glassmorphism, animations |
| Vanilla JS | Mobile menu, scroll animations, intersection observer |
| Tailwind CSS | Utility classes (compiled, no CDN in production) |
| Google Fonts | Playfair Display + Inter |
| Font Awesome 6 | Icons |
| GitHub Pages | Hosting |

## Project Structure

```
warrenvictor.github.io/
├── index.html              # Main portfolio page
├── 404.html                # Custom error page
├── assets/
│   ├── css/styles.css      # Extracted + compiled styles
│   ├── js/main.js          # Extracted scripts
│   └── img/                # Local images (headshot, OG image)
├── references/             # Source files (git-ignored, not deployed)
│   ├── Index.txt           # Original single-file backup
│   └── Resume Warren Victor.pdf
├── README.md
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE
└── .gitignore
```

## Local Development

Open `index.html` directly in a browser — no build step or server required.

### Rebuilding Tailwind CSS (if modifying utility classes)

Tailwind CSS is compiled locally with the standalone Tailwind CLI so GitHub Pages requires no build step:

```bash
# Compile and minify Tailwind CSS
npx -y tailwindcss@3 -i ./assets/css/input.css -o ./assets/css/tailwind.min.css --minify

# Or watch for changes during development
npx -y tailwindcss@3 -i ./assets/css/input.css -o ./assets/css/tailwind.min.css --watch
```

## TODO Checklist

- [ ] Supply `assets/Warren-Victor-CV.pdf` (with mobile number removed)
- [x] Populate Featured Projects & Platforms section with live Firebase web apps and managed portals
- [x] Review and complete content audit (Phase 2 & Phase 3)
- [x] Replace Tailwind CDN with compiled CSS (Phase 4)
- [x] Run Lighthouse audit and fix issues (Phase 4 — 91+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO)
- [ ] Deploy to GitHub Pages (Phase 5)

## Deployment (GitHub Pages)

This site is designed to deploy automatically as a GitHub Pages user site:

1. **Create the repository on GitHub:**
   - Go to [github.com/new](https://github.com/new)
   - Repository name: `warrenvictor.github.io`
   - Set to **Public**
   - Leave "Initialize with README" **unchecked**

2. **Push from local terminal:**
   ```bash
   git push -u origin main
   ```

3. **Verify deployment:**
   - GitHub Pages will automatically build and publish the root of `main` at `https://warrenvictor.github.io`.

## Privacy

⚠️ The `references/` directory is git-ignored and must **never** be committed. It contains a PDF with a personal mobile number that should not be published.

## License

[MIT](./LICENSE)

---

© 2026 Warren Victor. All Rights Reserved.
