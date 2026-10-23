#!/usr/bin/env python3
"""
Warren Victor Portfolio — CSS Build & Minification Script
Minifies assets/css/styles.css and bundles it with assets/css/tailwind.min.css
into assets/css/main.min.css.
"""

import os
import re
import sys

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
STYLES_CSS = os.path.join(BASE_DIR, 'assets', 'css', 'styles.css')
STYLES_MIN = os.path.join(BASE_DIR, 'assets', 'css', 'styles.min.css')
TAILWIND_MIN = os.path.join(BASE_DIR, 'assets', 'css', 'tailwind.min.css')
MAIN_MIN = os.path.join(BASE_DIR, 'assets', 'css', 'main.min.css')


def minify_css(css_content: str) -> str:
    """Simple, reliable CSS minifier without external dependencies."""
    # Remove comments
    css_content = re.sub(r'/\*[\s\S]*?\*/', '', css_content)
    # Normalize whitespace
    css_content = re.sub(r'\s+', ' ', css_content)
    # Remove space around punctuation
    css_content = re.sub(r'\s*([\{\}\:\;\,\>])\s*', r'\1', css_content)
    # Remove trailing semicolons in blocks
    css_content = re.sub(r';\}', '}', css_content)
    return css_content.strip()


def build():
    if not os.path.exists(STYLES_CSS):
        print(f"Error: {STYLES_CSS} not found", file=sys.stderr)
        sys.exit(1)

    print("[1/2] Minifying assets/css/styles.css...")
    with open(STYLES_CSS, 'r', encoding='utf-8') as f:
        raw_styles = f.read()

    minified_styles = minify_css(raw_styles)
    with open(STYLES_MIN, 'w', encoding='utf-8') as f:
        f.write(minified_styles)

    styles_size = len(minified_styles.encode('utf-8'))
    print(f"  -> Created styles.min.css ({styles_size:,} bytes)")

    print("[2/2] Merging tailwind.min.css + styles.min.css into main.min.css...")
    tailwind_content = ""
    if os.path.exists(TAILWIND_MIN):
        with open(TAILWIND_MIN, 'r', encoding='utf-8') as f:
            tailwind_content = f.read().strip()
    else:
        print(f"  Warning: {TAILWIND_MIN} not found. Only styles.min.css will be included.")

    combined = tailwind_content + ('\n' if tailwind_content else '') + minified_styles
    with open(MAIN_MIN, 'w', encoding='utf-8') as f:
        f.write(combined)

    main_size = len(combined.encode('utf-8'))
    print(f"  -> Created main.min.css ({main_size:,} bytes)")
    print("SUCCESS: Production stylesheet ready at assets/css/main.min.css")


if __name__ == '__main__':
    build()
