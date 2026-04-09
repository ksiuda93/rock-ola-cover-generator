# Rock-Ola Cover Generator — Jukebox Page Design

**Date:** 2026-04-09
**Status:** Approved

---

## Overview

Redesign `rockola-generator.html` so the entire page looks like a 1950s–60s Rock-Ola jukebox cabinet (Retro Red & Cream style). The generator functionality stays the same; only the visual presentation changes.

---

## Visual Style

- **Primary colour:** Red `#cc0000` (cabinet body)
- **Cream:** `#fdf5e6` / `#f0dfc0` (arch, control panel)
- **Gold trim:** `#b8860b` / `#ffd700`
- **Walnut base:** `#8B4513` → `#4a2208`
- **Page background:** Near-black `#111`

---

## Page Structure (top → bottom)

### 1. Arched top (`cabinet-arch`)
- Cream gradient background, border-radius creates a rounded arch shape
- Logo: `Rock-Ola` — Impact font, red `#cc0000`, large, letter-spaced
- Subtitle: `Cover Generator` — small, grey, uppercase, letter-spaced
- Gold trim stripe immediately below the arch

### 2. Red body (`cabinet-body`)
Three-column flex layout:

| Left | Centre | Right |
|------|--------|-------|
| Animated bubble tubes | Glass window (card grid) | Animated bubble tubes |

**Bubble tubes:**
- 4 tubes per side, alternating orange→yellow and yellow→orange gradient
- CSS `@keyframes` animation: translucent white blob floats from bottom to top, loops, staggered delays per tube
- Tubes have rounded ends, inner shadow, subtle outer glow

**Glass window:**
- Dark tinted background `rgba(0,0,0,0.45)`
- Thin semi-transparent white border
- Scrollable, 2-column CSS grid
- Contains the actual title-strip cards at real print size

### 3. Control panel (`cabinet-controls`)
- Cream background, gold top border
- Centred label: `◆ Control Panel ◆`
- Two-column layout:
  - **Left:** CSV `<textarea>` (resizable)
  - **Right (stacked):**
    - File upload zone (dashed gold border)
    - Separator `<select>` (Auto / Comma / Semicolon / Tab)
    - Action buttons row
- **GENERATE button:** rounded pill, red radial gradient, dark red border + drop shadow
- **PRINT button:** rounded pill, green radial gradient, dark green border + drop shadow
- Stats line below (italic, grey): e.g. `6 cards — approx. 1 A4 page`

### 4. Walnut base (`cabinet-base`)
- Brown gradient, rounded bottom corners, box-shadow below

---

## Card Design (title strip — 7.5 × 2.4 cm)

```
┌─────────────────────────────────────┐
│   A   Fernando                      │  ← Side A, top half, "A" in black bold
│─────────────────────────────────────│  ← blue bar (#0000ff)
│      ┌───────────────────────┐      │  ← white strip, blue border
│      │        ABBA           │      │  ← Artist/Title, centred, bold
│      └───────────────────────┘      │
│   B   Life                          │  ← Side B, bottom half, "B" in black bold
└─────────────────────────────────────┘
```

- Background: `#b4c7dc` (light blue)
- Blue bar: `#0000ff`, 0.35cm tall, full width, at `top: 1.03cm`
- White strip: `background: white`, `border: 1.5px solid #0000ff`, height 0.55cm, centered on bar
- **Title in white strip:** centred, bold Arial, ~8–8.5pt, black
- **Side A area (top 0.9cm):** centred, `A` label bold black, song title normal black, ~7pt
- **Side B area (bottom 0.9cm):** centred, `B` label bold black, song title normal black, ~7pt
- Slot number: top-right corner, 5pt grey

---

## CSV Format

| Column | Required | Description |
|--------|----------|-------------|
| `Title` | Yes | Artist / band name (appears in white strip) |
| `SideA` | Yes | Side A song title |
| `SideB` | Yes | Side B song title |
| `Num` | No | Custom slot number (auto-numbered if omitted) |
| `Info` | No | Optional extra label (bottom-right) |

Auto-detects separator: comma, semicolon, or tab. Handles quoted fields.

---

## Print Behaviour

- `@media print`: entire cabinet (arch, body, tubes, controls) is `display: none`
- Only the card grid renders: 2 columns × 7.5cm, gap 2mm, 5mm page margin
- `print-color-adjust: exact` to preserve card colours
- Cards are `break-inside: avoid`
- Approx. 24 cards per A4 sheet

---

## Responsive

- Cabinet has `max-width: 900px`, centred
- Arch font scales with `clamp()`
- On narrow screens (< 600px) bubble tubes shrink or are hidden; glass window takes full width

---

## Files Changed

- `rockola-generator.html` — complete rewrite of CSS + HTML structure; JS logic unchanged

---

## Out of Scope

- Backend / server
- User accounts
- Saving sessions
- Colour customisation of cards
