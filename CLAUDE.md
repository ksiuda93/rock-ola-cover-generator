# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page app — a jukebox-themed title strip generator for Rock-Ola jukeboxes. No build step, no dependencies, no framework. Open `index.html` directly in a browser.

Deployed via GitHub Actions to: **https://ksiuda93.github.io/rock-ola-cover-generator/**

Any push to `main` triggers `.github/workflows/deploy.yml`, which publishes the repo root to GitHub Pages.

## Architecture

Everything lives in `index.html` — inline CSS and JS, no external files except the Google Fonts stylesheet.

**HTML structure (top → bottom):**
- `.cabinet-arch` — arched cream top, Rock-Ola logo (Impact font)
- `.gold-trim` — decorative gold stripe
- `.cabinet-body` — red section; flex row of `.tubes` | `.glass-window` | `.tubes`
- `.gold-trim-2` — decorative gold stripe
- `.cabinet-controls` — cream panel: CSV textarea, file upload, separator `<select>`, Generate + Print buttons
- `.cabinet-base` — walnut-coloured footer

**JS (bottom of file, no modules):**
- `detectSep(text)` — sniffs comma / semicolon / tab from the first CSV line
- `parseCSV(text, sep)` — RFC-4180-style parser handling quoted fields
- `loadFile(input)` — FileReader wrapper for CSV upload
- `generate()` — reads `#csvInput`, parses CSV, builds `.jukebox-card` DOM nodes, injects into `#cards` (`.glass-window`). Auto-runs on `load`.

## Card design (title strip 7.5 × 2.4 cm)

```
┌─────────────────────────────────────┐
│   A   <SideA song>                  │  top 0.9 cm  — .j-side-a
│─────────────────────────────────────│  blue bar (#0000ff) at top: 1.03 cm — .j-bar
│      ┌───────────────────────┐      │  white strip centred on bar — .j-strip
│      │   <Title (artist)>    │      │  Oswald 600, centred
│      └───────────────────────┘      │
│   B   <SideB song>                  │  bottom 0.9 cm — .j-side-b
└─────────────────────────────────────┘
```

- Background `#b4c7dc`, blue bar `#0000ff`, white strip with `1.5px solid #0000ff` border
- **Font:** Oswald (Google Fonts) — weight 600 for artist name, 400 for song titles
- **A/B labels** (`.j-label`): black bold, same Oswald 600
- Slot number (`.j-num`): top-right, 5 pt grey, auto-incremented or taken from `Num` column

## CSV format

| Column | Required | Notes |
|--------|----------|-------|
| `Title` | Yes | Artist name — appears in white strip |
| `SideA` | Yes | Side A song title |
| `SideB` | Yes | Side B song title |
| `Num` | No | Custom slot number (auto-numbered if omitted) |
| `Info` | No | Parsed but not currently rendered |

Headers are case-insensitive. Separator auto-detected; overridable via UI dropdown.

## Print

`@media print` hides `.cabinet-arch`, `.gold-trim`, `.tubes`, `.cabinet-controls`, `.gold-trim-2`, `.cabinet-base`. Only `.glass-window` and `.jukebox-card` children print — 2-column grid, 2 mm gap, 5 mm margin, ~24 cards per A4. `print-color-adjust: exact` preserves card colours.

## Design spec

Full visual design decisions in `docs/superpowers/specs/2026-04-09-jukebox-page-design.md`.
