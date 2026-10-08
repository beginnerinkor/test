import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../aisync.html', import.meta.url), 'utf8');

test('document skeleton', () => {
  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<html lang="ko">/);
  assert.match(html, /<meta name="viewport"[^>]*width=device-width/);
  assert.match(html, /<title>AI싱크클럽<\/title>/);
});

test('required sections', () => {
  for (const id of ['hero', 'about', 'activities', 'join', 'apply']) {
    assert.match(html, new RegExp(`<section id="${id}"`), `missing #${id}`);
  }
});

test('CTA buttons point to #apply', () => {
  const ctas = [...html.matchAll(/<a class="btn" href="([^"]+)"/g)].map(m => m[1]);
  assert.ok(ctas.length >= 2);
  assert.ok(ctas.every(href => href === '#apply'));
});

test('three activity cards', () => {
  const cards = html.match(/<article class="card">/g) ?? [];
  assert.equal(cards.length, 3);
});

test('dark mode token blocks', () => {
  assert.match(html, /@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)/);
  assert.match(html, /:root\[data-theme="dark"\]\s*\{/);
});

test('external resources only from Google Fonts', () => {
  const urls = [...html.matchAll(/(?:href|src)="(https?:\/\/[^"]+)"/g)].map(m => new URL(m[1]).host);
  assert.ok(urls.length > 0);
  for (const host of urls) {
    assert.ok(['fonts.googleapis.com', 'fonts.gstatic.com'].includes(host), `unexpected host ${host}`);
  }
});
