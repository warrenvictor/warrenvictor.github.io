#!/usr/bin/env python3
"""
Warren Victor Portfolio — Theme Switcher & Preservation Tool
Allows easily switching between themes and saving new theme designs.
Re-applicable in code editor terminal via Python 3.

Commands:
    python scripts/switch-theme.py list
    python scripts/switch-theme.py status
    python scripts/switch-theme.py apply <theme-name> [--offline]
    python scripts/switch-theme.py save <new-theme-name> [description]
"""

import os
import sys
import json
import shutil
import subprocess
import re
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
THEMES_DIR = os.path.join(BASE_DIR, 'themes')
ACTIVE_THEME_FILE = os.path.join(THEMES_DIR, 'active-theme.json')
STYLES_CSS = os.path.join(BASE_DIR, 'assets', 'css', 'styles.css')
STYLES_MIN = os.path.join(BASE_DIR, 'assets', 'css', 'styles.min.css')
TAILWIND_MIN = os.path.join(BASE_DIR, 'assets', 'css', 'tailwind.min.css')
MAIN_MIN = os.path.join(BASE_DIR, 'assets', 'css', 'main.min.css')
TAILWIND_CONFIG = os.path.join(BASE_DIR, 'tailwind.config.js')
INDEX_HTML = os.path.join(BASE_DIR, 'index.html')
NOT_FOUND_HTML = os.path.join(BASE_DIR, '404.html')


def get_active_theme():
    if os.path.exists(ACTIVE_THEME_FILE):
        try:
            with open(ACTIVE_THEME_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {"activeTheme": "theme-sapphire-glass", "name": "Deep Sapphire Glassmorphism"}


def find_theme_dir(query: str):
    """Finds a theme directory matching query name."""
    if not os.path.exists(THEMES_DIR):
        return None
    candidates = [
        query,
        f"theme-{query}",
        query.lower(),
        f"theme-{query.lower()}",
        query.replace('_', '-'),
        f"theme-{query.replace('_', '-')}",
    ]
    for d in os.listdir(THEMES_DIR):
        theme_path = os.path.join(THEMES_DIR, d)
        if os.path.isdir(theme_path):
            if d in candidates or d.lower() in candidates:
                return theme_path
    return None


def list_themes():
    active = get_active_theme().get('activeTheme', '')
    print("\n" + "=" * 65)
    print("  Warren Victor Portfolio — Preserved Theme Library")
    print("=" * 65)

    if not os.path.exists(THEMES_DIR):
        print("  No themes directory found.")
        return

    themes_found = 0
    for d in sorted(os.listdir(THEMES_DIR)):
        theme_path = os.path.join(THEMES_DIR, d)
        if os.path.isdir(theme_path):
            manifest_file = os.path.join(theme_path, 'theme.json')
            name = d
            desc = "No description provided."
            version = "1.0.0"
            if os.path.exists(manifest_file):
                try:
                    with open(manifest_file, 'r', encoding='utf-8') as f:
                        data = json.load(f)
                        name = data.get('name', name)
                        desc = data.get('description', desc)
                        version = data.get('version', version)
                except Exception:
                    pass

            is_active = (d == active or d == f"theme-{active}" or active == f"theme-{d}")
            marker = "  [*] ACTIVE: " if is_active else "  [ ] "
            print(f"{marker}{d}")
            print(f"      Name:        {name} (v{version})")
            print(f"      Description: {desc[:80]}...")
            print(f"      Location:    themes/{d}/")
            print()
            themes_found += 1

    if themes_found == 0:
        print("  No theme presets found.")
    else:
        print(f"Total Preserved Themes: {themes_found}")
        print("\nTo apply a theme:   python scripts/switch-theme.py apply <name>")
        print("To save current:    python scripts/switch-theme.py save <new-name> \"Description\"")
    print("=" * 65 + "\n")


def status_theme():
    active_data = get_active_theme()
    active_id = active_data.get('activeTheme', 'theme-sapphire-glass')
    theme_dir = find_theme_dir(active_id)

    print("\n" + "=" * 65)
    print("  Current Active Theme Status")
    print("=" * 65)
    print(f"  Identifier:   {active_id}")
    print(f"  Name:         {active_data.get('name', 'N/A')}")
    print(f"  Version:      {active_data.get('version', 'N/A')}")
    print(f"  Applied At:   {active_data.get('appliedAt', 'N/A')}")
    print(f"  Description:  {active_data.get('description', 'N/A')}")

    if theme_dir and os.path.exists(os.path.join(theme_dir, 'theme.json')):
        try:
            with open(os.path.join(theme_dir, 'theme.json'), 'r', encoding='utf-8') as f:
                manifest = json.load(f)
                colors = manifest.get('colors', {})
                if colors:
                    print("\n  Color Palette Tokens:")
                    for k, v in colors.items():
                        print(f"    -- {k:18}: {v}")
        except Exception:
            pass
    print("=" * 65 + "\n")


def apply_theme(theme_name: str, offline: bool = False):
    theme_dir = find_theme_dir(theme_name)
    if not theme_dir:
        print(f"Error: Theme '{theme_name}' not found in {THEMES_DIR}", file=sys.stderr)
        print("Run 'python scripts/switch-theme.py list' to see available themes.", file=sys.stderr)
        sys.exit(1)

    theme_id = os.path.basename(theme_dir)
    print(f"\n[1/5] Applying theme '{theme_id}'...")

    # Load theme metadata
    manifest_file = os.path.join(theme_dir, 'theme.json')
    manifest = {}
    if os.path.exists(manifest_file):
        with open(manifest_file, 'r', encoding='utf-8') as f:
            manifest = json.load(f)

    # 1. Copy styles.css
    theme_styles = os.path.join(theme_dir, 'styles.css')
    if os.path.exists(theme_styles):
        shutil.copy2(theme_styles, STYLES_CSS)
        print(f"  -> Restored assets/css/styles.css from themes/{theme_id}/styles.css")
    else:
        print(f"  Warning: {theme_styles} not found, skipping styles.css copy.")

    # 2. Copy tailwind.config.js
    theme_tailwind = os.path.join(theme_dir, 'tailwind.config.js')
    if os.path.exists(theme_tailwind):
        shutil.copy2(theme_tailwind, TAILWIND_CONFIG)
        print(f"  -> Restored tailwind.config.js from themes/{theme_id}/tailwind.config.js")

    # 3. Check for pre-built backups or rebuild
    backups_dir = os.path.join(theme_dir, 'backups')
    rebuilt_tailwind = False

    if not offline and shutil.which('npx'):
        print("\n[2/5] Compiling Tailwind CSS utilities via npx tailwindcss...")
        try:
            cmd = "npx -y tailwindcss@3 -i ./assets/css/input.css -o ./assets/css/tailwind.min.css --minify"
            subprocess.run(cmd, shell=True, check=True, cwd=BASE_DIR)
            print("  -> Compiled assets/css/tailwind.min.css")
            rebuilt_tailwind = True
        except Exception as e:
            print(f"  Tailwind compile warning: {e}. Falling back to pre-built backup...")

    if not rebuilt_tailwind:
        backup_tw = os.path.join(backups_dir, 'tailwind.min.css')
        if os.path.exists(backup_tw):
            shutil.copy2(backup_tw, TAILWIND_MIN)
            print(f"  -> Restored pre-compiled assets/css/tailwind.min.css from backup")

    # 4. Minify styles.css and merge into main.min.css
    print("\n[3/5] Bundling and minifying production stylesheet...")
    build_script = os.path.join(BASE_DIR, 'scripts', 'build-css.py')
    if os.path.exists(build_script):
        subprocess.run([sys.executable, build_script], check=True, cwd=BASE_DIR)
    else:
        # Fallback to backup main.min.css
        backup_main = os.path.join(backups_dir, 'main.min.css')
        if os.path.exists(backup_main):
            shutil.copy2(backup_main, MAIN_MIN)
            print("  -> Restored assets/css/main.min.css from backup")

    # 5. Update meta tags / favicon if present in theme.json
    print("\n[4/5] Synchronizing HTML <head> meta tags and favicons...")
    theme_color = manifest.get('meta', {}).get('themeColor')
    favicon_svg = manifest.get('meta', {}).get('favicon')

    if theme_color:
        update_html_theme_color(INDEX_HTML, theme_color)
        update_html_theme_color(NOT_FOUND_HTML, theme_color)
        print(f"  -> Set <meta name='theme-color' content='{theme_color}'>")

    if favicon_svg:
        update_html_favicon(INDEX_HTML, favicon_svg)
        update_html_favicon(NOT_FOUND_HTML, favicon_svg)
        print("  -> Updated dynamic SVG favicon")

    # 6. Update active-theme.json
    print("\n[5/5] Updating active theme tracking...")
    active_record = {
        "activeTheme": theme_id,
        "name": manifest.get('name', theme_id),
        "version": manifest.get('version', "1.0.0"),
        "appliedAt": datetime.now().isoformat(),
        "description": manifest.get('description', '')
    }
    with open(ACTIVE_THEME_FILE, 'w', encoding='utf-8') as f:
        json.dump(active_record, f, indent=2)

    print("\n" + "=" * 65)
    print(f"SUCCESS: Theme '{manifest.get('name', theme_id)}' successfully applied!")
    print(f"Active Theme File: {ACTIVE_THEME_FILE}")
    print("=" * 65 + "\n")


def update_html_theme_color(html_path: str, color: str):
    if not os.path.exists(html_path):
        return
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(
        r'<meta\s+name=["\']theme-color["\']\s+content=["\'][^"\']+["\']',
        f'<meta name="theme-color" content="{color}"',
        content
    )
    if new_content != content:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(new_content)


def update_html_favicon(html_path: str, favicon_href: str):
    if not os.path.exists(html_path):
        return
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = re.sub(
        r'<link\s+rel=["\']icon["\']\s+href=["\'][^"\']+["\']\s+type=["\']image/svg\+xml["\']',
        f'<link rel="icon" href="{favicon_href}" type="image/svg+xml"',
        content
    )
    if new_content != content:
        with open(html_path, 'w', encoding='utf-8') as f:
            f.write(new_content)


def save_current_theme(new_theme_name: str, description: str = ""):
    clean_id = "theme-" + new_theme_name.lower().replace(" ", "-").replace("theme-", "")
    target_dir = os.path.join(THEMES_DIR, clean_id)
    backups_dir = os.path.join(target_dir, 'backups')
    os.makedirs(backups_dir, exist_ok=True)

    print(f"\n[1/4] Preserving current design as '{clean_id}'...")

    # Copy styles.css and tailwind.config.js
    if os.path.exists(STYLES_CSS):
        shutil.copy2(STYLES_CSS, os.path.join(target_dir, 'styles.css'))
        shutil.copy2(STYLES_CSS, os.path.join(backups_dir, 'styles.css'))
    if os.path.exists(TAILWIND_CONFIG):
        shutil.copy2(TAILWIND_CONFIG, os.path.join(target_dir, 'tailwind.config.js'))
        shutil.copy2(TAILWIND_CONFIG, os.path.join(backups_dir, 'tailwind.config.js'))

    # Backup compiled CSS and HTML
    for src, name in [
        (STYLES_MIN, 'styles.min.css'),
        (TAILWIND_MIN, 'tailwind.min.css'),
        (MAIN_MIN, 'main.min.css'),
        (INDEX_HTML, 'index.html'),
        (NOT_FOUND_HTML, '404.html')
    ]:
        if os.path.exists(src):
            shutil.copy2(src, os.path.join(backups_dir, name))

    print("[2/4] Extracting design tokens from styles.css...")
    colors = {}
    if os.path.exists(STYLES_CSS):
        with open(STYLES_CSS, 'r', encoding='utf-8') as f:
            styles_text = f.read()
        var_matches = re.findall(r'(--color-[\w\-]+):\s*([^;]+);', styles_text)
        for var_name, var_val in var_matches:
            key = var_name.replace('--color-', '')
            colors[key] = var_val.strip()

    # Extract meta tags from index.html
    theme_color = "#0f172a"
    favicon_href = ""
    if os.path.exists(INDEX_HTML):
        with open(INDEX_HTML, 'r', encoding='utf-8') as f:
            idx = f.read()
        m_color = re.search(r'<meta\s+name=["\']theme-color["\']\s+content=["\']([^"\']+)["\']', idx)
        if m_color:
            theme_color = m_color.group(1)
        m_fav = re.search(r'<link\s+rel=["\']icon["\']\s+href=["\']([^"\']+)["\']\s+type=["\']image/svg\+xml["\']', idx)
        if m_fav:
            favicon_href = m_fav.group(1)

    print("[3/4] Writing theme manifest (theme.json)...")
    manifest = {
        "id": clean_id,
        "name": new_theme_name.replace('-', ' ').title(),
        "version": "1.0.0",
        "status": "custom-preset",
        "description": description or f"Custom design theme '{new_theme_name}'.",
        "author": "Warren Victor",
        "created": datetime.now().strftime("%Y-%m-%d"),
        "colors": colors,
        "meta": {
            "themeColor": theme_color,
            "favicon": favicon_href
        }
    }
    with open(os.path.join(target_dir, 'theme.json'), 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)

    # Write tokens.css
    if os.path.exists(STYLES_CSS):
        root_block = re.search(r':root\s*\{[\s\S]*?\}', styles_text)
        if root_block:
            with open(os.path.join(target_dir, 'tokens.css'), 'w', encoding='utf-8') as f:
                f.write(f"/* Tokens for {clean_id} */\n" + root_block.group(0) + "\n")

    print("[4/4] Updating active-theme tracking...")
    active_record = {
        "activeTheme": clean_id,
        "name": manifest["name"],
        "version": manifest["version"],
        "appliedAt": datetime.now().isoformat(),
        "description": manifest["description"]
    }
    with open(ACTIVE_THEME_FILE, 'w', encoding='utf-8') as f:
        json.dump(active_record, f, indent=2)

    print("\n" + "=" * 65)
    print(f"SUCCESS: Theme successfully saved as '{clean_id}' in themes/{clean_id}/")
    print(f"You can revert back to Sapphire Glass anytime via:")
    print(f"    python scripts/switch-theme.py apply sapphire-glass")
    print(f"And return to this theme via:")
    print(f"    python scripts/switch-theme.py apply {clean_id}")
    print("=" * 65 + "\n")


def print_help():
    print("""
Warren Victor Portfolio — Theme Switcher & Preservation Tool

USAGE:
    python scripts/switch-theme.py <command> [arguments]

COMMANDS:
    list                         List all preserved theme presets and active status
    status                       Show currently active theme and design tokens
    apply <theme-name> [--offline]
                                 Switch to specified theme (e.g. 'sapphire-glass')
                                 and rebuild production styles
    save <new-theme-name> [desc] Snapshot the current workspace design as a new theme

EXAMPLES:
    python scripts/switch-theme.py list
    python scripts/switch-theme.py apply sapphire-glass
    python scripts/switch-theme.py save emerald-glass "Emerald green dark glass theme"
    python scripts/switch-theme.py status
""")


if __name__ == '__main__':
    args = sys.argv[1:]
    if not args or args[0] in ('-h', '--help', 'help'):
        print_help()
        sys.exit(0)

    cmd = args[0].lower()
    if cmd == 'list':
        list_themes()
    elif cmd == 'status':
        status_theme()
    elif cmd == 'apply':
        if len(args) < 2:
            print("Error: Missing theme name. Example: python scripts/switch-theme.py apply sapphire-glass", file=sys.stderr)
            sys.exit(1)
        offline_mode = '--offline' in args or '--fast' in args
        apply_theme(args[1], offline=offline_mode)
    elif cmd == 'save':
        if len(args) < 2:
            print("Error: Missing new theme name. Example: python scripts/switch-theme.py save emerald-glass", file=sys.stderr)
            sys.exit(1)
        desc_arg = args[2] if len(args) > 2 else ""
        save_current_theme(args[1], desc_arg)
    else:
        print(f"Unknown command: '{cmd}'", file=sys.stderr)
        print_help()
        sys.exit(1)
