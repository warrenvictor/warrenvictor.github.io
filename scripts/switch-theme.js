#!/usr/bin/env node
/**
 * Warren Victor Portfolio — Theme Switcher & Preservation Tool (Node.js)
 * Allows easily switching between themes and saving new theme designs.
 * Re-applicable in code editor terminal via Node.js.
 *
 * Commands:
 *     node scripts/switch-theme.js list
 *     node scripts/switch-theme.js status
 *     node scripts/switch-theme.js apply <theme-name> [--offline]
 *     node scripts/switch-theme.js save <new-theme-name> [description]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_DIR = path.resolve(__dirname, '..');
const THEMES_DIR = path.join(BASE_DIR, 'themes');
const ACTIVE_THEME_FILE = path.join(THEMES_DIR, 'active-theme.json');
const STYLES_CSS = path.join(BASE_DIR, 'assets', 'css', 'styles.css');
const STYLES_MIN = path.join(BASE_DIR, 'assets', 'css', 'styles.min.css');
const TAILWIND_MIN = path.join(BASE_DIR, 'assets', 'css', 'tailwind.min.css');
const MAIN_MIN = path.join(BASE_DIR, 'assets', 'css', 'main.min.css');
const TAILWIND_CONFIG = path.join(BASE_DIR, 'tailwind.config.js');
const INDEX_HTML = path.join(BASE_DIR, 'index.html');
const NOT_FOUND_HTML = path.join(BASE_DIR, '404.html');

function getActiveTheme() {
    if (fs.existsSync(ACTIVE_THEME_FILE)) {
        try {
            return JSON.parse(fs.readFileSync(ACTIVE_THEME_FILE, 'utf-8'));
        } catch (e) {}
    }
    return { activeTheme: 'theme-sapphire-glass', name: 'Deep Sapphire Glassmorphism' };
}

function findThemeDir(query) {
    if (!fs.existsSync(THEMES_DIR)) return null;
    const candidates = [
        query,
        `theme-${query}`,
        query.toLowerCase(),
        `theme-${query.toLowerCase()}`,
        query.replace(/_/g, '-'),
        `theme-${query.replace(/_/g, '-')}`,
    ];
    const entries = fs.readdirSync(THEMES_DIR);
    for (const d of entries) {
        const p = path.join(THEMES_DIR, d);
        if (fs.statSync(p).isDirectory()) {
            if (candidates.includes(d) || candidates.includes(d.toLowerCase())) {
                return p;
            }
        }
    }
    return null;
}

function listThemes() {
    const active = getActiveTheme().activeTheme || '';
    console.log('\n' + '='.repeat(65));
    console.log('  Warren Victor Portfolio — Preserved Theme Library');
    console.log('='.repeat(65));

    if (!fs.existsSync(THEMES_DIR)) {
        console.log('  No themes directory found.');
        return;
    }

    let count = 0;
    const entries = fs.readdirSync(THEMES_DIR).sort();
    for (const d of entries) {
        const themePath = path.join(THEMES_DIR, d);
        if (fs.statSync(themePath).isDirectory()) {
            const manifestPath = path.join(themePath, 'theme.json');
            let name = d;
            let desc = 'No description provided.';
            let version = '1.0.0';
            if (fs.existsSync(manifestPath)) {
                try {
                    const data = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
                    name = data.name || name;
                    desc = data.description || desc;
                    version = data.version || version;
                } catch (e) {}
            }
            const isActive = (d === active || d === `theme-${active}` || active === `theme-${d}`);
            const marker = isActive ? '  [*] ACTIVE: ' : '  [ ] ';
            console.log(`${marker}${d}`);
            console.log(`      Name:        ${name} (v${version})`);
            console.log(`      Description: ${desc.slice(0, 80)}...`);
            console.log(`      Location:    themes/${d}/\n`);
            count++;
        }
    }
    console.log(`Total Preserved Themes: ${count}`);
    console.log('\nTo apply a theme:   node scripts/switch-theme.js apply <name>');
    console.log('To save current:    node scripts/switch-theme.js save <new-name> "Description"');
    console.log('='.repeat(65) + '\n');
}

function statusTheme() {
    const active = getActiveTheme();
    const activeId = active.activeTheme || 'theme-sapphire-glass';
    const themeDir = findThemeDir(activeId);

    console.log('\n' + '='.repeat(65));
    console.log('  Current Active Theme Status');
    console.log('='.repeat(65));
    console.log(`  Identifier:   ${activeId}`);
    console.log(`  Name:         ${active.name || 'N/A'}`);
    console.log(`  Version:      ${active.version || 'N/A'}`);
    console.log(`  Applied At:   ${active.appliedAt || 'N/A'}`);
    console.log(`  Description:  ${active.description || 'N/A'}`);

    if (themeDir && fs.existsSync(path.join(themeDir, 'theme.json'))) {
        try {
            const manifest = JSON.parse(fs.readFileSync(path.join(themeDir, 'theme.json'), 'utf-8'));
            if (manifest.colors) {
                console.log('\n  Color Palette Tokens:');
                for (const [k, v] of Object.entries(manifest.colors)) {
                    console.log(`    -- ${k.padEnd(18)}: ${v}`);
                }
            }
        } catch (e) {}
    }
    console.log('='.repeat(65) + '\n');
}

function minifyCss(css) {
    return css
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s*([\{\}\:\;\,\>])\s*/g, '$1')
        .replace(/;\}/g, '}')
        .trim();
}

function applyTheme(themeName, offline = false) {
    const themeDir = findThemeDir(themeName);
    if (!themeDir) {
        console.error(`Error: Theme '${themeName}' not found in ${THEMES_DIR}`);
        console.error("Run 'node scripts/switch-theme.js list' to see available themes.");
        process.exit(1);
    }
    const themeId = path.basename(themeDir);
    console.log(`\n[1/5] Applying theme '${themeId}'...`);

    let manifest = {};
    const manifestPath = path.join(themeDir, 'theme.json');
    if (fs.existsSync(manifestPath)) {
        manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    }

    // 1. Copy styles.css
    const themeStyles = path.join(themeDir, 'styles.css');
    if (fs.existsSync(themeStyles)) {
        fs.copyFileSync(themeStyles, STYLES_CSS);
        console.log(`  -> Restored assets/css/styles.css from themes/${themeId}/styles.css`);
    }

    // 2. Copy tailwind.config.js
    const themeTailwind = path.join(themeDir, 'tailwind.config.js');
    if (fs.existsSync(themeTailwind)) {
        fs.copyFileSync(themeTailwind, TAILWIND_CONFIG);
        console.log(`  -> Restored tailwind.config.js from themes/${themeId}/tailwind.config.js`);
    }

    // 3. Rebuild Tailwind or restore pre-compiled
    const backupsDir = path.join(themeDir, 'backups');
    let rebuiltTailwind = false;

    if (!offline) {
        console.log('\n[2/5] Compiling Tailwind CSS utilities via npx tailwindcss...');
        try {
            execSync('npx -y tailwindcss@3 -i ./assets/css/input.css -o ./assets/css/tailwind.min.css --minify', {
                cwd: BASE_DIR,
                stdio: 'pipe'
            });
            console.log('  -> Compiled assets/css/tailwind.min.css');
            rebuiltTailwind = true;
        } catch (e) {
            console.log(`  Tailwind compile warning. Falling back to pre-built backup...`);
        }
    }

    if (!rebuiltTailwind) {
        const backupTw = path.join(backupsDir, 'tailwind.min.css');
        if (fs.existsSync(backupTw)) {
            fs.copyFileSync(backupTw, TAILWIND_MIN);
            console.log('  -> Restored pre-compiled assets/css/tailwind.min.css from backup');
        }
    }

    // 4. Minify styles.css and combine into main.min.css
    console.log('\n[3/5] Bundling and minifying production stylesheet...');
    const rawStyles = fs.readFileSync(STYLES_CSS, 'utf-8');
    const minStyles = minifyCss(rawStyles);
    fs.writeFileSync(STYLES_MIN, minStyles, 'utf-8');

    let twContent = '';
    if (fs.existsSync(TAILWIND_MIN)) {
        twContent = fs.readFileSync(TAILWIND_MIN, 'utf-8').trim();
    }
    const combined = twContent + (twContent ? '\n' : '') + minStyles;
    fs.writeFileSync(MAIN_MIN, combined, 'utf-8');
    console.log(`  -> Created assets/css/main.min.css (${Buffer.byteLength(combined)} bytes)`);

    // 5. Update HTML meta tags
    console.log('\n[4/5] Synchronizing HTML <head> meta tags and favicons...');
    const themeColor = manifest.meta && manifest.meta.themeColor;
    const faviconSvg = manifest.meta && manifest.meta.favicon;

    if (themeColor) {
        updateHtmlThemeColor(INDEX_HTML, themeColor);
        updateHtmlThemeColor(NOT_FOUND_HTML, themeColor);
        console.log(`  -> Set <meta name="theme-color" content="${themeColor}">`);
    }
    if (faviconSvg) {
        updateHtmlFavicon(INDEX_HTML, faviconSvg);
        updateHtmlFavicon(NOT_FOUND_HTML, faviconSvg);
        console.log('  -> Updated dynamic SVG favicon');
    }

    // 6. Update active-theme.json
    console.log('\n[5/5] Updating active theme tracking...');
    const activeRecord = {
        activeTheme: themeId,
        name: manifest.name || themeId,
        version: manifest.version || '1.0.0',
        appliedAt: new Date().toISOString(),
        description: manifest.description || ''
    };
    fs.writeFileSync(ACTIVE_THEME_FILE, JSON.stringify(activeRecord, null, 2), 'utf-8');

    console.log('\n' + '='.repeat(65));
    console.log(`SUCCESS: Theme '${manifest.name || themeId}' successfully applied!`);
    console.log(`Active Theme File: ${ACTIVE_THEME_FILE}`);
    console.log('='.repeat(65) + '\n');
}

function updateHtmlThemeColor(htmlPath, color) {
    if (!fs.existsSync(htmlPath)) return;
    let content = fs.readFileSync(htmlPath, 'utf-8');
    const updated = content.replace(
        /<meta\s+name=["']theme-color["']\s+content=["'][^"']+["']/g,
        `<meta name="theme-color" content="${color}"`
    );
    if (updated !== content) fs.writeFileSync(htmlPath, updated, 'utf-8');
}

function updateHtmlFavicon(htmlPath, faviconHref) {
    if (!fs.existsSync(htmlPath)) return;
    let content = fs.readFileSync(htmlPath, 'utf-8');
    const updated = content.replace(
        /<link\s+rel=["']icon["']\s+href=["'][^"']+["']\s+type=["']image\/svg\+xml["']/g,
        `<link rel="icon" href="${faviconHref}" type="image/svg+xml"`
    );
    if (updated !== content) fs.writeFileSync(htmlPath, updated, 'utf-8');
}

function saveCurrentTheme(newThemeName, description = '') {
    const cleanId = 'theme-' + newThemeName.toLowerCase().replace(/\s+/g, '-').replace(/^theme-/, '');
    const targetDir = path.join(THEMES_DIR, cleanId);
    const backupsDir = path.join(targetDir, 'backups');
    fs.mkdirSync(backupsDir, { recursive: true });

    console.log(`\n[1/4] Preserving current design as '${cleanId}'...`);

    if (fs.existsSync(STYLES_CSS)) {
        fs.copyFileSync(STYLES_CSS, path.join(targetDir, 'styles.css'));
        fs.copyFileSync(STYLES_CSS, path.join(backupsDir, 'styles.css'));
    }
    if (fs.existsSync(TAILWIND_CONFIG)) {
        fs.copyFileSync(TAILWIND_CONFIG, path.join(targetDir, 'tailwind.config.js'));
        fs.copyFileSync(TAILWIND_CONFIG, path.join(backupsDir, 'tailwind.config.js'));
    }

    for (const [src, name] of [
        [STYLES_MIN, 'styles.min.css'],
        [TAILWIND_MIN, 'tailwind.min.css'],
        [MAIN_MIN, 'main.min.css'],
        [INDEX_HTML, 'index.html'],
        [NOT_FOUND_HTML, '404.html']
    ]) {
        if (fs.existsSync(src)) fs.copyFileSync(src, path.join(backupsDir, name));
    }

    console.log('[2/4] Extracting design tokens from styles.css...');
    const colors = {};
    let stylesText = '';
    if (fs.existsSync(STYLES_CSS)) {
        stylesText = fs.readFileSync(STYLES_CSS, 'utf-8');
        const matches = [...stylesText.matchAll(/(--color-[\w\-]+):\s*([^;]+);/g)];
        for (const m of matches) {
            colors[m[1].replace('--color-', '')] = m[2].trim();
        }
    }

    let themeColor = '#0f172a';
    let faviconHref = '';
    if (fs.existsSync(INDEX_HTML)) {
        const idx = fs.readFileSync(INDEX_HTML, 'utf-8');
        const mc = idx.match(/<meta\s+name=["']theme-color["']\s+content=["']([^"']+)["']/);
        if (mc) themeColor = mc[1];
        const mf = idx.match(/<link\s+rel=["']icon["']\s+href=["']([^"']+)["']\s+type=["']image\/svg\+xml["']/);
        if (mf) faviconHref = mf[1];
    }

    console.log('[3/4] Writing theme manifest (theme.json)...');
    const manifest = {
        id: cleanId,
        name: newThemeName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        version: '1.0.0',
        status: 'custom-preset',
        description: description || `Custom design theme '${newThemeName}'.`,
        author: 'Warren Victor',
        created: new Date().toISOString().slice(0, 10),
        colors,
        meta: {
            themeColor,
            favicon: faviconHref
        }
    };
    fs.writeFileSync(path.join(targetDir, 'theme.json'), JSON.stringify(manifest, null, 2), 'utf-8');

    const rootBlock = stylesText.match(/:root\s*\{[\s\S]*?\}/);
    if (rootBlock) {
        fs.writeFileSync(path.join(targetDir, 'tokens.css'), `/* Tokens for ${cleanId} */\n` + rootBlock[0] + '\n', 'utf-8');
    }

    console.log('[4/4] Updating active-theme tracking...');
    const activeRecord = {
        activeTheme: cleanId,
        name: manifest.name,
        version: manifest.version,
        appliedAt: new Date().toISOString(),
        description: manifest.description
    };
    fs.writeFileSync(ACTIVE_THEME_FILE, JSON.stringify(activeRecord, null, 2), 'utf-8');

    console.log('\n' + '='.repeat(65));
    console.log(`SUCCESS: Theme successfully saved as '${cleanId}' in themes/${cleanId}/`);
    console.log(`You can revert back to Sapphire Glass anytime via:`);
    console.log(`    node scripts/switch-theme.js apply sapphire-glass`);
    console.log(`And return to this theme via:`);
    console.log(`    node scripts/switch-theme.js apply ${cleanId}`);
    console.log('='.repeat(65) + '\n');
}

// CLI Argument Handling
const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
    console.log(`
Warren Victor Portfolio — Theme Switcher & Preservation Tool (Node.js)

USAGE:
    node scripts/switch-theme.js <command> [arguments]

COMMANDS:
    list                         List all preserved theme presets and active status
    status                       Show currently active theme and design tokens
    apply <theme-name> [--offline]
                                 Switch to specified theme (e.g. 'sapphire-glass')
                                 and rebuild production styles
    save <new-theme-name> [desc] Snapshot the current workspace design as a new theme

EXAMPLES:
    node scripts/switch-theme.js list
    node scripts/switch-theme.js apply sapphire-glass
    node scripts/switch-theme.js save emerald-glass "Emerald green dark glass theme"
    node scripts/switch-theme.js status
`);
    process.exit(0);
}

const cmd = args[0].toLowerCase();
if (cmd === 'list') {
    listThemes();
} else if (cmd === 'status') {
    statusTheme();
} else if (cmd === 'apply') {
    if (args.length < 2) {
        console.error("Error: Missing theme name. Example: node scripts/switch-theme.js apply sapphire-glass");
        process.exit(1);
    }
    const offline = args.includes('--offline') || args.includes('--fast');
    applyTheme(args[1], offline);
} else if (cmd === 'save') {
    if (args.length < 2) {
        console.error("Error: Missing new theme name. Example: node scripts/switch-theme.js save emerald-glass");
        process.exit(1);
    }
    saveCurrentTheme(args[1], args[2] || '');
} else {
    console.error(`Unknown command: '${cmd}'`);
    process.exit(1);
}
