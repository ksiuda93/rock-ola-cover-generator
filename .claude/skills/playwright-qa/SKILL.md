---
name: playwright-qa
description: Use when writing Playwright tests for a web project — static pages, SPAs, or server-rendered. Covers what to test, selector strategy, edge cases, and common pitfalls.
---

# Playwright QA

## Overview

Write tests as a QA engineer: verify UI presence, functional behavior, edge cases, and data-driven scenarios. Keep tests independent, assert user-observable outcomes, and prefer resilient selectors.

## Selector Strategy (most → least preferred)

1. `getByRole('button', { name: 'Generate' })` — semantic, survives refactors
2. `locator('[data-testid="card-grid"]')` — explicit test hook
3. `locator('.stable-class-name')` — stable CSS class
4. `getByText('Fernando')` — visible text
5. **Avoid:** XPath, nth-child, visual position

## What to Test (QA Layers)

**Layer 1 — UI presence:** Key elements visible on load, correct counts, correct text.

**Layer 2 — Functional behavior:** Action → DOM change, input → output correctness, state transitions.

**Layer 3 — Edge cases:** Empty input, malformed input, boundary values (0/1/max items), special characters.

**Layer 4 — Data-driven:** Multiple separators (`,` `;` tab), quoted fields with delimiters inside, optional columns present vs absent.

## Test Structure

```js
const { test, expect } = require('@playwright/test');

// Group by feature area, name by observable outcome
test('generates 6 cards from default CSV on load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.jukebox-card')).toHaveCount(6);
});

test('empty CSV shows error message', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill('');
  await page.locator('.btn-generate').click();
  await expect(page.locator('.empty-msg')).toBeVisible();
  await expect(page.locator('.jukebox-card')).toHaveCount(0);
});
```

## Static HTML Page Pattern

For pages served with `npx serve` — configure `webServer` in `playwright.config.js`:

```js
webServer: {
  command: 'npx serve . -p 3000 --no-clipboard',
  port: 3000,
  reuseExistingServer: !process.env.CI,
},
```

Playwright waits for load by default. For JS-initialized content assert existence rather than adding manual waits.

## Common Mistakes

| Mistake | Fix |
|---------|-----|
| `toContainText('Rock-Ola')` when HTML has `&#8209;` (non-breaking hyphen) | Test partial string: `toContainText('Rock')` |
| Tests depending on each other | Each test calls `page.goto('/')` independently |
| Asserting computed CSS instead of DOM | Check element presence/text, not `color` or `display` |
| Over-specific selectors (`nth-child`) | Use semantic or named-class selectors |
| No negative assertions | Add `.toHaveCount(0)` or `.not.toBeVisible()` for absent elements |

## HTML Entity Gotcha

Entities render as Unicode in the DOM — test the rendered character, not the source:

```js
// ❌ Fails — HTML has &#8209; which is U+2011, not U+002D
await expect(locator).toContainText('Rock-Ola');

// ✅ Test partial string that avoids the ambiguous character
await expect(locator).toContainText('Rock');
```

## Test Independence Rule

Every test starts from a clean page. Never share DOM state via module-level variables:

```js
// ✅ Independent — navigates fresh each time
test('...', async ({ page }) => {
  await page.goto('/');
  // test in full isolation
});
```

## GitHub Actions

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps chromium

- name: Run tests
  run: npm test

- name: Upload report on failure
  uses: actions/upload-artifact@v4
  if: failure()
  with:
    name: playwright-report
    path: playwright-report/
    retention-days: 7
```

Use `reporter: 'github'` in `playwright.config.js` when `process.env.CI` is set — formats failures as GitHub annotations.
