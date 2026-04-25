/**
 * Post-build prerender script.
 * Starts a static server for the dist/ output, uses puppeteer-core
 * (which connects to the system-installed Chrome) to render SPA routes,
 * then saves the fully rendered HTML so crawlers see the content immediately.
 *
 * Usage:  node scripts/prerender.mjs
 * Called automatically after `npm run build` via the build script.
 */

import { launch } from 'puppeteer-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');
const PORT = 4174;

/* ========== routes to prerender ==========
 *   pathname  →  output file            →  CSS selector to wait for
 */
const ROUTES = [
  { pathname: '/',       file: 'index.html',         waitFor: '.home-nav' },
  { pathname: '/editor', file: 'editor/index.html',  waitFor: 'body'      },
];

/* ---------- helpers ---------- */

const MIME_MAP = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2',
};

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_MAP[ext] || 'application/octet-stream';
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch {
    return false;
  }
  return true;
}

function findChrome() {
  const candidates = [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

/* ---------- main ---------- */

async function prerender() {
  console.log('[prerender] Starting static server…');

  const server = http.createServer((req, res) => {
    let url = new URL(req.url, `http://localhost:${PORT}`);
    let filePath = path.join(distDir, url.pathname === '/' ? 'index.html' : url.pathname);
    if (!serveFile(res, filePath)) {
      serveFile(res, path.join(distDir, 'index.html'));
    }
  });

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[prerender] Server running at http://localhost:${PORT}`);

  const chromePath = findChrome();
  if (!chromePath) {
    console.warn('[prerender] Chrome not found — skipping. Install Chrome or set CHROME_PATH.');
    server.close();
    return;
  }
  console.log(`[prerender] Using Chrome: ${chromePath}`);

  const browser = await launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    // ---------- Prerender each route ----------
    for (const route of ROUTES) {
      try {
        const page = await browser.newPage();
        const url = `http://localhost:${PORT}${route.pathname}`;

        await page.goto(url, { waitUntil: 'networkidle0' });
        await page.waitForSelector(route.waitFor, { timeout: 15000 });
        // Extra settle time for async rendering
        await new Promise((r) => setTimeout(r, 500));

        const html = await page.content();

        const outPath = path.join(distDir, route.file);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html);

        console.log(`[prerender] ✅ ${route.pathname} → ${route.file} (${(html.length / 1024).toFixed(1)} KB)`);
        await page.close();
      } catch (err) {
        console.warn(`[prerender] ⚠️  ${route.pathname} failed: ${err.message}`);
      }
    }

    // ---------- Generate og:image PNG ----------
    try {
      const ogPage = await browser.newPage();
      await ogPage.setViewport({ width: 1200, height: 630 });

      const ogSvgPath = path.join(distDir, 'og-image.svg');
      if (fs.existsSync(ogSvgPath)) {
        await ogPage.goto(`http://localhost:${PORT}/og-image.svg`, { waitUntil: 'networkidle0' });
        await new Promise((r) => setTimeout(r, 300));
        await ogPage.screenshot({ path: path.join(distDir, 'og-image.png'), type: 'png' });
        const pngSize = fs.statSync(path.join(distDir, 'og-image.png')).size;
        console.log(`[prerender] ✅ OG image saved (${(pngSize / 1024).toFixed(1)} KB)`);
      }
      await ogPage.close();
    } catch (err) {
      console.warn('[prerender] OG image generation skipped:', err.message);
    }
  } finally {
    await browser.close();
    server.close();
  }
}

prerender().catch((err) => {
  console.error('[prerender] Failed:', err);
  process.exitCode = 1;
});
