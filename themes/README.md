# Preserved Themes Directory

This directory stores archived, self-contained theme presets for the Warren Victor portfolio.

## Active Theme
Refer to [`active-theme.json`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/active-theme.json) for the current active theme configuration.

## Preserved Themes
- [`theme-editorial-horizon/`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/theme-editorial-horizon): **Editorial Navy & Clean White (v1.1.0 Active)**
  - Dual-tone architecture: Dynamic ambient flowing navy hero canvas (`#071526` → `#153359` → `#0a1b32`) + clean white and light slate content sections
  - Architectural SVG bezier curve horizon divider (`.hero-horizon-divider`) with waist-tucked portrait layering
  - Scroll glide parallax and accessible interactive prompt
  - Editorial typography scale (`.editorial-lead`) and strict 8px grid spacing
- [`theme-sapphire-glass/`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/themes/theme-sapphire-glass): **Deep Sapphire Glassmorphism (v1.0.0 Snapshot)**
  - Dark blue/slate canvas gradient (`#0f172a` → `#1e3a8a`)
  - Electric sky-blue brand highlights (`#0ea5e9`, `#0369a1`)
  - Translucent frosted glass cards with `backdrop-filter: blur(12px)`
  - Serif headers (`Playfair Display`) + Sans-serif body (`Inter`)

## How to Switch Themes
Run from your code editor terminal:

```bash
# List all themes
python scripts/switch-theme.py list

# Switch to Editorial Navy & Clean White (v1.1.0)
python scripts/switch-theme.py apply editorial-horizon

# Revert to Deep Sapphire Glassmorphism (v1.0.0)
python scripts/switch-theme.py apply sapphire-glass

# Save your next theme
python scripts/switch-theme.py save <new-theme-name> "Description"
```

For complete design tokens, manual copy-paste instructions, and design guidelines, see the master [`THEMES.md`](file:///c:/Users/victorw/.gemini/antigravity-ide/scratch/warrenvictorgithub/THEMES.md) document at the root of the project.
