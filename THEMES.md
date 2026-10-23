# Theme Design System & Preservation Guide

This document defines the **Theme Preservation Architecture** for the Warren Victor portfolio. It ensures that the **original v1.0.0 production theme ("Deep Sapphire Glassmorphism")** is permanently preserved in the repository backend and can be effortlessly reapplied or reverted to at any time directly in your code editor.

---

## 🎨 Theme Library Overview

All theme presets are archived in the [`themes/`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes) directory:

| Theme Identifier | Name | Status | Accent | Base Tone |
|:-----------------|:-----|:------:|:-------|:----------|
| `theme-sapphire-glass` | **Deep Sapphire Glassmorphism** | Preserved (v1.0.0 Snapshot) | Sky Blue (`#0ea5e9`) | Dark Slate / Navy (`#0f172a` → `#1e3a8a`) |
| `theme-editorial-horizon` | **Editorial Navy & Clean White** | **Active (v1.1.0)** | Sky Blue (`#0ea5e9` / `#38bdf8`) | Dual-Tone: Navy Ambient Canvas + Clean White Sections |

---

## 🏛️ Active Theme Specification: Editorial Navy & Clean White (v1.1.0)

### 1. Dual-Tone Architecture & Colors (`:root`)
- **Hero Canvas:** Dynamic gradient (`#071526` → `#0d223c` → `#153359` → `#1a3f6f` → `#0a1b32`) with ambient radial orbs and floating social deck dock.
- **Section 2, 4, 6 (Light):** Pure White (`#ffffff`) and Slate 50 (`#f8fafc`) with navy-900 typography (`#0f172a`) and sky-600 accents (`#0284c7`).
- **Section 3, 5 (Dark):** Deep Navy (`#0d223c` / `#153359`) with pure white headlines and frosted glass cards.
- **Horizon Transition:** Architectural SVG bezier curve (`.hero-horizon-divider`) with negative margins (`-56px` to `-120px`) and `filter: drop-shadow(0 -10px 24px rgba(7, 21, 38, 0.35))`.
- **Editorial Typography:** Playfair Display + Inter with `.editorial-lead` (`font-size: 1.125rem` / `1.25rem`, `font-weight: 500`) and strict 8px grid spacing tokens.

## 💎 Preserved Theme Specification: Deep Sapphire Glassmorphism (v1.0.0)

### 1. Color Palette Tokens (`:root`)

```css
:root {
    /* Theme Colors */
    --color-bg-primary: #0f172a;       /* Slate 900 — Deep canvas background */
    --color-bg-secondary: #1e3a8a;     /* Blue 900 — Ambient diagonal gradient midpoint */
    --color-text-primary: #f8fafc;     /* Slate 50 — High-contrast primary headings & text */
    --color-text-secondary: #94a3b8;   /* Slate 400 — Subtitles, metadata & body text */
    --color-text-muted: #64748b;       /* Slate 500 — Timeline lines & fine details */
    --color-brand: #0ea5e9;            /* Sky 500 — Signature brand accent */
    --color-brand-dark: #0369a1;       /* Sky 700 — Dark brand button state */
    --color-brand-light: #e0f2fe;      /* Sky 100 — Highlight text */
    --color-behance: #1769ff;          /* Behance Brand Blue */
    --color-glass-bg: rgba(255, 255, 255, 0.05);     /* Translucent glass panel surface */
    --color-glass-border: rgba(255, 255, 255, 0.1);  /* Subtle frosted card border */
    --color-glass-hover: rgba(255, 255, 255, 0.1);   /* Interactive panel hover background */

    /* Spacing Grid (8px increments) */
    --space-1: 8px;
    --space-2: 16px;
    --space-3: 24px;
    --space-4: 32px;
    --space-5: 40px;
    --space-6: 48px;
    --space-8: 64px;
    --space-10: 80px;
    --space-12: 96px;

    /* Typography */
    --font-serif: 'Playfair Display', serif;
    --font-sans: 'Inter', sans-serif;

    /* Transitions & Easing */
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
    --transition-fast: 0.3s ease;
    --transition-medium: 0.5s ease;
}
```

### 2. Canvas Background & Glassmorphism
- **Body Background:**
  ```css
  background: linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 50%, var(--color-bg-primary) 100%);
  background-attachment: fixed;
  color: var(--color-text-primary);
  ```
- **Glass Panel Surface:**
  ```css
  .glass-panel {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  }
  ```

### 3. Tailwind Configuration ([`tailwind.config.js`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/tailwind.config.js))
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./404.html", "./assets/js/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        brand: {
          light: '#e0f2fe',
          DEFAULT: '#0ea5e9',
          dark: '#0369a1',
        }
      }
    },
  },
  plugins: [],
}
```

### 4. Head Meta & Dynamic SVG Favicon
- **Browser Chrome Meta Color:**
  ```html
  <meta name="theme-color" content="#0f172a">
  ```
- **Inline SVG Favicon (No external asset needed):**
  ```html
  <link rel="icon" href="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%230f172a' stroke='%230ea5e9' stroke-width='4'/%3E%3Ctext x='50' y='68' font-family='Times New Roman, serif' font-size='56' font-style='italic' fill='%23ffffff' text-anchor='middle'%3Ewv%3C/text%3E%3C/svg%3E" type="image/svg+xml">
  ```

---

## 🔄 How to Revert or Switch Themes

You can switch themes using **either** the automated CLI utility or via manual copy-paste in your code editor.

### Method 1: Automated 1-Command Switch (Recommended)

From the built-in terminal in your code editor (VS Code, Antigravity, etc.):

#### Using Python 3:
```bash
# Check library status and see which theme is currently active
python scripts/switch-theme.py list

# Revert to the original Sapphire Glass theme
python scripts/switch-theme.py apply sapphire-glass

# Fast/offline mode (restores pre-compiled CSS directly from backups without running npx)
python scripts/switch-theme.py apply sapphire-glass --offline
```

#### Using Node.js:
```bash
# Check library status
node scripts/switch-theme.js list

# Revert to the original Sapphire Glass theme
node scripts/switch-theme.js apply sapphire-glass
```

*What the switcher does automatically:*
1. Restores [`assets/css/styles.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/assets/css/styles.css) from the preserved preset.
2. Restores [`tailwind.config.js`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/tailwind.config.js).
3. Recompiles and minifies Tailwind & custom CSS into [`assets/css/main.min.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/assets/css/main.min.css).
4. Synchronizes `<meta name="theme-color">` and the SVG favicon in [`index.html`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/index.html) and [`404.html`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/404.html).
5. Updates [`themes/active-theme.json`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/active-theme.json).

---

### Method 2: Manual Code Editor Reversion (Zero CLI)

If you prefer editing directly in the code editor without running scripts:

1. **Restore `styles.css`:**
   Copy the content of [`themes/theme-sapphire-glass/styles.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/theme-sapphire-glass/styles.css) into [`assets/css/styles.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/assets/css/styles.css).

2. **Restore `tailwind.config.js`:**
   Copy [`themes/theme-sapphire-glass/tailwind.config.js`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/theme-sapphire-glass/tailwind.config.js) to the project root.

3. **Restore Compiled Production Stylesheet:**
   Copy the pre-compiled file from [`themes/theme-sapphire-glass/backups/main.min.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/theme-sapphire-glass/backups/main.min.css) into [`assets/css/main.min.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/assets/css/main.min.css).

4. **Restore Favicon & Theme Color in HTML:**
   Ensure `<meta name="theme-color" content="#0f172a">` and the SVG favicon in `index.html` and `404.html` match Section 4 above.

---

## 🛠️ How to Create & Preserve a New Theme

When designing your next theme:

### Step 1: Customize Design Tokens
Edit [`assets/css/styles.css`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/assets/css/styles.css):
- Update `:root` custom properties (`--color-bg-primary`, `--color-brand`, etc.).
- Update background gradient or panel styling as desired.

### Step 2: Update Tailwind Colors
Edit [`tailwind.config.js`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/tailwind.config.js):
- Adjust the `brand` palette hex codes so utility classes like `text-brand`, `bg-brand`, `border-brand` match your new palette.

### Step 3: Recompile Production CSS
```bash
python scripts/build-css.py
```
*(Or use `npx -y tailwindcss@3 -i ./assets/css/input.css -o ./assets/css/tailwind.min.css --minify && python scripts/build-css.py` if new Tailwind utility classes were introduced).*

### Step 4: Snapshot & Preserve Your New Theme
Once you are happy with the new theme design, preserve it in the backend with:

```bash
# Example saving a new emerald or sunset theme:
python scripts/switch-theme.py save emerald-glass "Emerald dark glass with mint green accents"
```

The script will automatically create `themes/theme-emerald-glass/`, extract your new tokens, backup all stylesheets, and register it in the theme library. You can now toggle back and forth between `sapphire-glass` and `emerald-glass` with a single command!

---

## 📁 Themes Directory Structure

```
themes/
├── active-theme.json                     # JSON tracking active theme state (v1.1.0)
├── README.md                             # Themes directory overview
├── theme-editorial-horizon/              # ACTIVE v1.1.0 Preserved Theme
│   ├── theme.json                        # Theme metadata, colors & tokens
│   ├── styles.css                        # v1.1.0 stylesheet (horizon curve, editorial lead)
│   ├── tailwind.config.js                # v1.1.0 Tailwind configuration
│   └── backups/                          # Production snapshots (CSS + HTML)
└── theme-sapphire-glass/                 # PRESERVED v1.0.0 Snapshot Theme
    ├── theme.json                        # Theme metadata, colors & tokens
    ├── tokens.css                        # Pure :root CSS variable definitions
    ├── styles.css                        # Complete original stylesheet
    ├── tailwind.config.js                # Original Tailwind configuration
    ├── head-meta.html                    # HTML snippet for <head> (meta & favicon)
    ├── 404-styles.css                    # Embedded styles for 404 page
    └── backups/                          # Exact immutable v1.0.0 snapshots
        ├── index.html
        ├── 404.html
        ├── styles.css
        ├── styles.min.css
        ├── tailwind.min.css
        └── main.min.css
```
