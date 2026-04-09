# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static single-page app — a jukebox-themed title strip generator for Rock-Ola jukeboxes. No build step, no dependencies. Open `index.html` directly in a browser.

Deployed via GitHub Actions to: **https://ksiuda93.github.io/rock-ola-cover-generator/**

Any push to `main` triggers the deploy workflow (`.github/workflows/deploy.yml`).

## Architecture

Everything lives in `index.html` — one self-contained file with inline CSS and JS. There is no framework, bundler, or backend.

**HTML structure (top → bottom):**
- `.cabinet-arch` — arched cream top, Rock-Ola logo
- `.gold-trim` — decorative stripe
- `.cabinet-body` — red section; flex row of `.tubes` | `.glass-window` | `.tubes`
- `.gold-trim-2` — decorative stripe
- `.cabinet-controls` — cream panel with CSV textarea, file upload, separator select, action buttons
- `.cabinet-base` — walnut-coloured footer

**JS (bottom of file, no modules):**
- `detectSep(text)` — sniffs comma / semicolon / tab from the first CSV line
- `parseCSV(text, sep)` — RFC-4180-style parser handling quoted fields
- `loadFile(input)` — FileReader wrapper for CSV upload
- `generate()` — reads `#csvInput`, calls `parseCSV`, builds `.jukebox-card` DOM nodes and injects them into `#cards` (the `.glass-window`)
- Auto-runs on `load`

## Card design (title strip 7.5 × 2.4 cm)

```
┌─────────────────────────────────────┐
│   A   <SideA song>                  │  top 0.9 cm
│─────────────────────────────────────│  blue bar at top: 1.03 cm
│      ┌───────────────────────┐      │  white strip centred on bar
│      │   <Title (artist)>    │      │
│      └───────────────────────┘      │
│   B   <SideB song>                  │  bottom 0.9 cm
└─────────────────────────────────────┘
```

- Background `#b4c7dc`, blue bar `#0000ff`, white strip with blue border
- A/B labels are **black bold**; artist name in strip is black bold centred
- Slot number (auto or from `Num` column) in top-right corner, 5 pt grey

## CSV format

| Column | Required |
|--------|----------|
| `Title` | Yes — artist name, appears in white strip |
| `SideA` | Yes |
| `SideB` | Yes |
| `Num` | No — custom slot number |
| `Info` | No — small bottom-right label (not rendered in current card design) |

Headers are case-insensitive. Separator is auto-detected; can be forced via the UI dropdown.

## Print

`@media print` hides the entire cabinet shell. Only `.glass-window` and its `.jukebox-card` children print, in a 2-column grid with 2 mm gap and 5 mm page margin — approximately 24 cards per A4 sheet.

## Design spec

Full visual design decisions documented in `docs/superpowers/specs/2026-04-09-jukebox-page-design.md`.
