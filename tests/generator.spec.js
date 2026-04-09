const { test, expect } = require('@playwright/test');

// ── Cabinet UI ──────────────────────────────────────────────────────────────

test('renders jukebox cabinet', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.cabinet-arch')).toBeVisible();
  await expect(page.locator('.brand-name')).toContainText('Rock');
  await expect(page.locator('.cabinet-controls')).toBeVisible();
  await expect(page.locator('.tubes')).toHaveCount(2);
});

// ── Default CSV ─────────────────────────────────────────────────────────────

test('generates 6 cards from default CSV on load', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.jukebox-card')).toHaveCount(6);
});

test('shows stats line after generation', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#stats')).toContainText('6 cards');
});

// ── Card layout ─────────────────────────────────────────────────────────────

test('card has Side A at top, artist in strip, Side B at bottom', async ({ page }) => {
  await page.goto('/');
  const card = page.locator('.jukebox-card').first();

  await expect(card.locator('.j-side-a')).toContainText('A');
  await expect(card.locator('.j-side-a')).toContainText('Fernando');

  await expect(card.locator('.j-strip')).toContainText('ABBA');

  await expect(card.locator('.j-side-b')).toContainText('B');
  await expect(card.locator('.j-side-b')).toContainText('Life');
});

test('A/B labels are present on every card', async ({ page }) => {
  await page.goto('/');
  const cards = page.locator('.jukebox-card');
  const count = await cards.count();

  for (let i = 0; i < count; i++) {
    const card = cards.nth(i);
    await expect(card.locator('.j-label').first()).toContainText('A');
    await expect(card.locator('.j-label').last()).toContainText('B');
  }
});

test('slot number is shown on each card', async ({ page }) => {
  await page.goto('/');
  const firstNum = page.locator('.jukebox-card .j-num').first();
  await expect(firstNum).toContainText('1');
});

// ── CSV input ───────────────────────────────────────────────────────────────

test('custom CSV generates correct number of cards', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill(
    'Title,SideA,SideB\nTest Artist,Song One,Song Two\nAnother Act,Track A,Track B'
  );
  await page.locator('.btn-generate').click();
  await expect(page.locator('.jukebox-card')).toHaveCount(2);
});

test('custom CSV shows correct content in cards', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill('Title,SideA,SideB\nMy Artist,Alpha,Beta');
  await page.locator('.btn-generate').click();

  const card = page.locator('.jukebox-card').first();
  await expect(card.locator('.j-strip')).toContainText('My Artist');
  await expect(card.locator('.j-side-a')).toContainText('Alpha');
  await expect(card.locator('.j-side-b')).toContainText('Beta');
});

test('empty CSV shows error message', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill('');
  await page.locator('.btn-generate').click();
  await expect(page.locator('.empty-msg')).toBeVisible();
  await expect(page.locator('.jukebox-card')).toHaveCount(0);
});

test('skips empty rows in CSV', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill(
    'Title,SideA,SideB\nArtist One,Song A,Song B\n\n\nArtist Two,Song C,Song D'
  );
  await page.locator('.btn-generate').click();
  await expect(page.locator('.jukebox-card')).toHaveCount(2);
});

// ── Separator detection ─────────────────────────────────────────────────────

test('auto-detects semicolon separator', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill('Title;SideA;SideB\nBand Name;Hit Song;B Side');
  await page.locator('.btn-generate').click();
  await expect(page.locator('.jukebox-card')).toHaveCount(1);
  await expect(page.locator('.j-strip')).toContainText('Band Name');
});

test('auto-detects comma separator', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill('Title,SideA,SideB\nComma Artist,Track 1,Track 2');
  await page.locator('.btn-generate').click();
  await expect(page.locator('.jukebox-card')).toHaveCount(1);
});

test('handles quoted fields with commas inside', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill(
    'Title,SideA,SideB\n"Simon, Garfunkel",The Sound of Silence,Mrs. Robinson'
  );
  await page.locator('.btn-generate').click();
  const card = page.locator('.jukebox-card').first();
  await expect(card.locator('.j-strip')).toContainText('Simon, Garfunkel');
});

// ── Custom Num column ───────────────────────────────────────────────────────

test('uses custom Num column for slot number', async ({ page }) => {
  await page.goto('/');
  await page.locator('#csvInput').fill('Title,SideA,SideB,Num\nArtist,Song A,Song B,A7');
  await page.locator('.btn-generate').click();
  await expect(page.locator('.jukebox-card .j-num').first()).toContainText('A7');
});
