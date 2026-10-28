import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { trainings, getPublishedTrainings } from '../src/data/site.ts';

test('les formations non validées ne créent aucune fiche publique', async () => {
  assert.equal(getPublishedTrainings().length, 0);
  assert.ok(trainings.every((training) => training.published === false));
  const entries = await readdir(new URL('../dist/formations/', import.meta.url));
  assert.deepEqual(entries, ['index.html']);
});

test('une formation publiée incomplète bloque la génération', () => {
  const draft = trainings[0];
  draft.published = true;
  try { assert.throws(() => getPublishedTrainings(), /fiche est incomplète/); }
  finally { draft.published = false; }
});

test('les pages livrées restent non indexables et sans formulaire', async () => {
  for (const path of ['index.html', 'formations/index.html', 'mentions-legales/index.html', '404.html']) {
    const html = await readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    assert.match(html, /<html lang="fr"/);
    assert.match(html, /noindex, nofollow/);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${path} doit avoir un seul titre principal`);
    assert.doesNotMatch(html, /<form[\s>]|<iframe[\s>]/);
    assert.doesNotMatch(html, /mailto:|tel:/);
  }
});

test('les liens internes et leurs ancres existent dans le build', async () => {
  for (const path of ['index.html', 'formations/index.html', 'mentions-legales/index.html', '404.html']) {
    const html = await readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    for (const [, href] of html.matchAll(/<a\b[^>]*href="([^"]+)"/g)) {
      if (/^https?:/.test(href)) continue;
      const [rawPath, fragment] = href.split('#');
      const base = process.env.DEPLOY_BASE?.replace(/\/$/, '') || '';
      if (rawPath) assert.ok(rawPath.startsWith(`${base}/`), `Lien hors du chemin de publication : ${href}`);
      const pathname = rawPath.slice(base.length);
      const destination = pathname ? `${pathname.replace(/^\//, '').replace(/\/$/, '')}/index.html`.replace(/^\//, '') : path;
      const target = await readFile(new URL(`../dist/${destination}`, import.meta.url), 'utf8');
      if (fragment) assert.ok(target.includes(`id="${fragment}"`), `${path} : ancre absente ${href}`);
    }
  }
});


test('les images, icônes et ressources locales respectent le chemin de publication', async () => {
  const base = process.env.DEPLOY_BASE?.replace(/\/$/, '') || '';
  for (const path of ['index.html', 'formations/index.html', 'mentions-legales/index.html', '404.html']) {
    const html = await readFile(new URL(`../dist/${path}`, import.meta.url), 'utf8');
    for (const [, attribute, url] of html.matchAll(/\b(src|href)="([^"#]+)"/g)) {
      if (!url.startsWith('/') || url.endsWith('/') || url.includes('#')) continue;
      assert.ok(url.startsWith(`${base}/`), `${path}: ${attribute} hors du chemin de publication : ${url}`);
      await readFile(new URL(`../dist/${url.slice(base.length + 1).split('?')[0]}`, import.meta.url));
    }
  }
});
