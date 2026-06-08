# Lectio — Project Handoff

Use this to start a fresh Claude conversation and continue where we left off.

---

## What Lectio is

A single-file PWA Bible reader with an Alabaster-inspired aesthetic. Everything lives in one `index.html` file. No build process, no framework — just HTML, CSS, and vanilla JS.

---

## Live URLs

| Project | URL | Repo |
|---------|-----|------|
| Lectio | https://bible.honest-resources.com | github.com/its-timformation/lectio |
| Study Bible | https://study-bible.honest-resources.com | github.com/its-timformation/study-bible |

Both hosted on **Cloudflare Pages**, auto-deploy on `git push`. Domain `honest-resources.com` is managed at the registrar (not Cloudflare DNS), so SSL settings are handled at the Cloudflare Pages project level.

---

## Deploying

```bash
./deploy.sh "v1.x.x — description"
```

That's it. Cloudflare Pages deploys in ~30 seconds.

---

## API Keys (baked into CONFIG in index.html)

```javascript
const CONFIG = {
  esvKey:      '9f69dd23a61013e2dd9385c4d46d87126b7fbff9',
  apiBibleKey: 'UgEBpBmtItCwT8EF18Rkb',
};
```

Keys are domain-locked to `bible.honest-resources.com`. They return 403 from any other origin — this is expected and correct.

---

## Current version: 1.8.2

### Full version history

| Version | Change |
|---------|--------|
| 1.0.0 | Initial build |
| 1.1.0 | ESV + API.Bible, compare mode |
| 1.2.0 | PWA, mobile overhaul, verse actions, bookmarks, highlights |
| 1.3.0 | Translation pill, compare modal, Cloudflare migration |
| 1.4.0 | Translation picker modal |
| 1.4.1 | Picker selected state (left bar), abbreviation overflow fix |
| 1.4.2 | Pill height parity, verse reference in action bar |
| 1.4.3 | Consecutive run grouping in references, arrows removed from pills |
| 1.4.4 | Fixed pill height with explicit height + line-height:1 |
| 1.4.5 | Smaller app icon letter |
| 1.5.0 | Two-row action bar, settings footer close (mobile), copy + search fixes |
| 1.6.0 | Search redesign: filters, keyword highlight, pagination |
| 1.7.0 | Full search overhaul: thematic expansion, book filters, infinite scroll, recent searches, reference detection |
| 1.7.1 | Dashed border-bottom for selected verses |
| 1.7.2 | Thinner dashed underline (1px) |
| 1.7.3 | SVG dashed underline (1.5px, longer dashes) |
| 1.7.4 | Smaller dashes on selected verse underline |
| 1.7.5 | Study Bible crosslink pill on desktop |
| 1.7.6 | Copy respects flowing prose setting |
| 1.7.7 | UK English throughout, removed American spelling duplicates from theme map |
| 1.8.0 | Share button with native share sheet and deep link support |
| 1.8.1 | Fix search rate limiting, UK spelling variants in theme map, baptism theme added |
| 1.8.2 | Simplified search with proper error messages shown in UI |

---

## Current known issues

1. **Search not working** — deployed v1.8.2 to show error messages in the UI. Next step: run a search on the live site and read the exact error message shown. Likely causes:
   - ESV API key's allowed domain list doesn't include `bible.honest-resources.com`
   - CORS issue from Cloudflare Pages domain
   - API key expired

2. **SSL warning on lectio.honest-resources.com** — the live URL is `bible.honest-resources.com` (which works). `lectio.honest-resources.com` is not connected to Cloudflare Pages. User can either add it as a custom domain or just use `bible.honest-resources.com`.

---

## Architecture — what's in index.html

```
<style>          CSS tokens, layout, all components
CONFIG           API keys
DATA             Book list, OSIS codes, free translations
PERSISTENCE      localStorage load/save
STATE (S)        Single state object
API FUNCTIONS    fetchBibleApi, fetchApiBibleCh, fetchEsv, loadApiBibles
TRANSLATION      buildSelect, renderTransPicker, translLabel, getAllTranslations
BIONIC           bionicWord, bionicText, processText
RENDER           buildText, render, updateNav, step
VERSE SELECTION  attachVerseHandlers, updateActionBar, selectedReference
HIGHLIGHTS       applyHighlightToSelected, clearSelection
SHARE            shareSelected, copySelected, bookmarkSelected
SEARCH           THEME_MAP, expandQuery, doSearch, renderItems, buildFilterChips
READING PLANS    PLAN_DEFS, getTodaysReading, renderPlanContent
COMPARE          openComparePicker, renderComparePicker, buildTabStrip
SETTINGS         all modal open/close, toggle and segmented control wiring
SELECTORS        openSelector, renderSelector (book/chapter picker)
BOOTSTRAP        all addEventListener wiring, URL param deep link reading
```

---

## Key design decisions

- **Single file** — everything in `index.html`. No bundler, no dependencies.
- **Accent colour** — `--hi: #B8722E` (warm amber). Night mode: `#D4943A`.
- **Fonts** — Cormorant Garamond (display/wordmark), Cormorant SC (pills/UI), EB Garamond (body), Jost (sans UI).
- **UK English** throughout all user-visible text. CSS properties (color, center) and Web/Canvas APIs stay American.
- **Bible text** from APIs uses American spellings (baptize etc.) — can't be changed.
- **Study Bible** is a fork at v1.7.0. Do not merge changes between projects.

---

## Tim's preferences

- Always end each update with the exact deploy command
- Diagnose before writing fix code
- Consult before significant UI/UX decisions
- Complete, pasteable code — no fragments
- UK English in all UI text
- Semantic versioning strictly followed (PATCH / MINOR / MAJOR)
- Python used for complex string replacements in bash to avoid escaping issues

---

## To start a new conversation

Paste this document and say:
> "This is my Lectio Bible reader project. Read the handoff doc and let's continue from where we left off."
