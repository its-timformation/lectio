# Lectio — Bible Reader

A single-page PWA Bible reader inspired by the Alabaster Bible aesthetic.
Live at your GitHub Pages or Netlify URL.

## Project structure

```
index.html     — The entire app. All HTML, CSS, and JS in one file.
sw.js          — Service worker for offline/PWA support.
manifest.json  — Web app manifest (name, icons, display mode).
icon.svg       — App icon (SVG, used by manifest and browser tab).
CLAUDE.md      — This file.
```

## How to make changes

All application code lives in `index.html`. Edit it directly.

### Key sections inside index.html

| Line range (approx) | What it contains |
|---|---|
| `<style>` block | All CSS — tokens, layout, components |
| `CONFIG = { ... }` | **Personal API keys** — fill these in |
| `const S = { ... }` | App state object |
| `// API` section | Fetch functions for bible-api.com, ESV, API.Bible |
| `function buildText(...)` | Renders verse HTML for a given passage |
| `async function render(...)` | Main render loop |
| `// BOOTSTRAP` | Event wiring — all addEventListener calls |
| `<nav class="bottom-tab-bar">` | Mobile bottom navigation |

### Common tasks

**Add a translation source**
1. Add a fetch function in the `// API` section
2. Add a new spec prefix (e.g. `'nlt:...'`) to `fetchPassage()`
3. Add entries to `getAllTranslations()` so it appears in search
4. Add to `buildSelect()` optgroups

**Change the default book/chapter on load**
Edit `S.book` and `S.chapter` in the state object.

**Add a new theme**
1. Add `[data-theme="yourname"]` CSS block with token overrides
2. Add a `<button data-value="yourname">` in the `#themeCtrl` segmented control

**Add a reading plan**
Add a new entry to `PLAN_DEFS` array and handle it in `buildPlanChapters()`.

**Change the app icon**
Edit `icon.svg`. The apple-touch-icon is generated from Canvas at runtime — update the canvas drawing code in the bootstrap section if you want it to match.

**Bump the service worker cache** (forces all users to get the new version)
In `sw.js`, change `const CACHE_NAME = 'lectio-v1'` to `lectio-v2` etc.

## Deploying updates

### GitHub Pages
```bash
git add -A
git commit -m "your change description"
git push
```
GitHub Pages redeploys automatically within ~60 seconds.

### Netlify (drag-and-drop)
Drag the folder onto the Netlify deploy area again — it detects changed files.

### Netlify (connected to GitHub)
If you connected Netlify to your GitHub repo, every `git push` auto-deploys.

## API keys

Fill these in at the top of `index.html` inside the `CONFIG` block:

```js
const CONFIG = {
  esvKey:      'your-esv-key-from-api.esv.org',
  apiBibleKey: 'your-key-from-scripture.api.bible',
};
```

- **ESV key**: free, from https://api.esv.org/account/create-application/
- **API.Bible key**: free (5000 calls/day), from https://scripture.api.bible

Keep the file private if your keys are filled in.

## DO NOT break

- The `CONFIG` block must stay at the top of the `<script>` tag
- `sw.js` must be served from the root path `/sw.js` for the service worker scope to work
- `manifest.json` must be at `/manifest.json`
- `icon.svg` must be at `/icon.svg`
