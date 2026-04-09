# Rock-Ola Cover Generator

[![Deploy to GitHub Pages](https://github.com/ksiuda93/rock-ola-cover-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/ksiuda93/rock-ola-cover-generator/actions/workflows/deploy.yml)
[![Live](https://img.shields.io/badge/Live-ksiuda93.github.io-cc0000?style=flat&logo=github)](https://ksiuda93.github.io/rock-ola-cover-generator/)

Generate title strips for a jukebox machine.

## Usage

Open `rockola-generator.html` directly in a browser — no server required.

1. Paste CSV data or upload a `.csv` file
2. Click **Generate covers**
3. Click **Print**

## CSV Format

```
Title,SideA,SideB
ABBA,Fernando,Life
The Beatles,Hey Jude,Revolution
```

Optional columns: `Num` (custom slot number), `Info` (additional label).

## Card dimensions

**7.5 × 2.4 cm** — fits standard jukebox title strip slots.

Approx. 24 cards per A4 sheet (2 columns).

## Files

| File | Description |
|------|-------------|
| `rockola-generator.html` | Generator — open in browser |
| `Rockola_dane.ods` | Sample data (LibreOffice Calc) |
| `Rockola_TXT.odt` | Card template (LibreOffice Writer) |
