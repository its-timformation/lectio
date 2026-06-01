# Lectio — Bible Reader

A single-page PWA Bible reader inspired by the Alabaster Bible aesthetic.
Live at: **lectio.honest-resources.com**
GitHub: **github.com/its-timformation/lectio**

## Related projects

| Project | Repo | Purpose |
|---------|------|---------|
| **Lectio** (this project) | `its-timformation/lectio` | Clean, minimal Bible reader |
| **Study Bible** | `its-timformation/study-bible` | Forked from Lectio v1.7.0 — study tools, commentary, cross-references |

Study Bible was forked from Lectio at v1.7.0 (June 2026). The two projects now evolve independently. **Do not merge changes between them without explicit instruction.**

When working on Lectio, do not reference or import anything from Study Bible. When working on Study Bible, same rule applies.

---

## Project structure

```
index.html     — The entire app. All HTML, CSS, and JS in one file.
sw.js          — Service worker for offline/PWA support.
manifest.json  — Web app manifest (name, icons, display mode).
icon.svg       — App icon (SVG, used by manifest and browser tab).
_headers       — Cloudflare Pages security and cache headers.
_redirects     — Cloudflare Pages HTTPS redirect rules.
deploy.sh      — One-command deploy script.
CLAUDE.md      — This file.
```

## How to make changes

All application code lives in `index.html`. Edit it directly.

### Key sections inside index.html

| Section | What it contains |
|---|---|
| `<style>` block | All CSS — tokens, layout, components |
| `CONFIG = { ... }` | **Personal API keys** — already filled in |
| `const S = { ... }` | App state object |
| `// API` section | Fetch functions for bible-api.com, ESV, API.Bible |
| `THEME_MAP` | Thematic search keyword expansion (~25 themes) |
| `function buildText(...)` | Renders verse HTML for a given passage |
| `async function render(...)` | Main render loop |
| `// BOOTSTRAP` | Event wiring — all addEventListener calls |
| `<nav class="bottom-tab-bar">` | Mobile bottom navigation |

### Common tasks

**Add a translation source**
1. Add a fetch function in the `// API` section
2. Add a new spec prefix (e.g. `'nlt:...'`) to `fetchPassage()`
3. Add entries to `getAllTranslations()`
4. Add to `buildSelect()` and `renderTransPicker()`

**Add a theme**
1. Add `[data-theme="yourname"]` CSS block with token overrides
2. Add a `<button data-value="yourname">` in `#themeCtrl`

**Add a reading plan**
Add a new entry to `PLAN_DEFS` and handle it in `buildPlanChapters()`.

**Add a thematic search expansion**
Add an entry to `THEME_MAP` — key is the theme word, value is array of related keywords.

**Change the app icon**
Edit `icon.svg` AND update the canvas drawing code in the bootstrap section to match.

**Bump the service worker cache** (forces all users to get fresh version)
In `sw.js`, increment `CACHE_NAME` e.g. `lectio-v2` → `lectio-v3`.

## Deploying

```bash
./deploy.sh "v1.x.x — description of change"
```

Cloudflare Pages auto-deploys on push. Live within ~30 seconds.

## API keys

Already baked into `CONFIG` at the top of `index.html`:
- `esvKey` — from api.esv.org
- `apiBibleKey` — from scripture.api.bible (rest.api.bible endpoint)

Keys are domain-locked to `lectio.honest-resources.com`. Do not share the file publicly with keys visible.

## DO NOT break

- `CONFIG` block must stay at the top of the `<script>` tag
- `sw.js` must be at root `/sw.js`
- `manifest.json` must be at `/manifest.json`
- `icon.svg` must be at `/icon.svg`
- `_headers` and `_redirects` must be at root for Cloudflare Pages

## Versioning

Lectio uses semantic versioning: `MAJOR.MINOR.PATCH`

Current version: **1.7.0**

### Rules
- **PATCH** — bug fixes, tweaks, small visual changes → `1.7.0` → `1.7.1`
- **MINOR** — new features, new UI components → `1.7.x` → `1.8.0`
- **MAJOR** — full redesign or structural overhaul → `1.x.x` → `2.0.0`

### Where to update
Two places in `index.html`:
1. `id="appVersion"` — version string
2. `id="appDate"` — month/year e.g. `June 2026`

### History
| Version | What changed |
|---------|-------------|
| 1.0.0 | Initial build — single HTML file, WEB/KJV translations |
| 1.1.0 | ESV + API.Bible keys, compare mode, formatting toggles |
| 1.2.0 | PWA, mobile overhaul, verse actions, bookmarks, highlights |
| 1.3.0 | Translation pill, compare modal redesign, Cloudflare migration, versioning |
| 1.4.0 | Translation picker modal — same style as compare picker |
| 1.4.1 | Picker selected state (left bar), abbreviation overflow fix |
| 1.4.2 | Pill height parity, verse reference in action bar |
| 1.4.3 | Consecutive run grouping in references, arrows removed from pills |
| 1.4.4 | Fixed pill height using explicit height + line-height:1 |
| 1.4.5 | Smaller app icon letter |
| 1.5.0 | Two-row action bar, settings footer close (mobile), search + copy fixes |
| 1.6.0 | Search redesign: filters, keyword highlight, pagination, settings close fix |
| 1.7.0 | Full search overhaul: thematic expansion, book filters, infinite scroll, recent searches, reference detection |

### Always tell the user
Before handing over an updated file, end with the deploy command:
```bash
./deploy.sh "vX.Y.Z — description"
```
