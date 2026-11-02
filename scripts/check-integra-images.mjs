// Run against Vite dev or preview. Uses the existing Taste Skill browser driver.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { Browser, sleep } from '../.agents/skills/taste-skill/scripts/lib/cdp.mjs';

const origin = process.argv[2] || 'http://127.0.0.1:4173';
const slug = process.argv[3] || 'integra';
const images = {
  livro: { remote: 'https://raw.githubusercontent.com/self1027/Livro/main/docs/screenshots/denuncias.png', fallback: '/media/livro-demo.webp', width: 1440, height: 1000 },
  integra: { remote: 'https://raw.githubusercontent.com/self1027/Integra/main/docs/screenshots/inicio.png', fallback: '/media/integra-demo.webp', width: 1440, height: 1000 },
  'megan-trimmer': { remote: 'https://raw.githubusercontent.com/self1027/MeganTrimmer/main/docs/screenshots/corte-salvo.png', fallback: '/media/megantrimmer-demo.png', width: 884, height: 635 },
};
assert.ok(images[slug], 'known project slug');
const { remote, fallback, width: imageWidth, height: imageHeight } = images[slug];
const output = `.taste-skill/${slug}-images`;
mkdirSync(output, { recursive: true });
const browser = await Browser.launch();
let passed = 0;
const check = (value, label) => { assert.ok(value, label); passed++; };
async function waitForImage(page, selector, expected, broken = false) {
  for (let attempt = 0; attempt < 80; attempt++) {
    if (await page.eval(({ selector, expected, broken }) => {
      const img = document.querySelector(selector);
      return img?.getAttribute('src') === expected && img.complete && (broken ? img.naturalWidth === 0 : img.naturalWidth > 0);
    }, { selector, expected, broken })) return;
    await sleep(100);
  }
  assert.fail(`${selector}: expected ${expected} (${broken ? 'broken' : 'loaded'})`);
}
async function key(page, key) {
  const code = key === 'Enter' ? 13 : 27;
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code: key, windowsVirtualKeyCode: code, ...(key === 'Enter' ? { text: '\r' } : {}) });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code: key, windowsVirtualKeyCode: code });
}
try {
  for (const width of [1440, 390]) {
    for (const language of ['pt-BR', 'en-US']) {
      for (const theme of ['light', 'dark']) {
        for (const mode of ['remote', 'fallback', 'both-fail']) {
          const page = await browser.newPage({ width, height: 900, mobile: width < 600, reducedMotion: true });
          let requests = 0;
          await page.send('Network.enable');
          if (mode !== 'remote') {
            await page.send('Network.setBlockedURLs', { urls: [remote, ...(mode === 'both-fail' ? [`${origin}${fallback}`] : [])] });
          }
          const off = browser.on(page.sessionId, 'Network.requestWillBeSent', ({ request }) => {
            if ([remote, `${origin}${fallback}`].includes(request.url)) requests++;
          });
          await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('murilo_portfolio_lang', '${language}');localStorage.setItem('murilo_portfolio_theme', '${theme}');` });
          const expected = mode === 'remote' ? remote : fallback;
          for (const route of ['/', `/projects/${slug}`]) {
            await page.goto(origin + route, { settleMs: 150 });
            const selector = route === '/' ? `[aria-labelledby="project-${slug}"] .image-trigger` : '.case-shell > .architecture-figure .image-trigger';
            await page.eval(selector => { const button = document.querySelector(selector); button.scrollIntoView(); button.focus(); }, selector);
            await waitForImage(page, `${selector} img`, expected, mode === 'both-fail');
            check(await page.eval(() => document.documentElement.scrollWidth <= innerWidth), 'no page overflow');
            if (mode === 'remote') {
              check(await page.eval(({ selector, imageWidth, imageHeight }) => {
                const img = document.querySelector(`${selector} img`);
                return Number(img.getAttribute('width')) === imageWidth && Number(img.getAttribute('height')) === imageHeight && img.naturalWidth === imageWidth && img.naturalHeight === imageHeight;
              }, { selector, imageWidth, imageHeight }), 'remote intrinsic dimensions');
            }
            if (mode !== 'both-fail') await page.screenshot({ path: `${output}/${width}-${language}-${theme}-${mode}-${route === '/' ? 'list' : 'case'}.jpg`, quality: 85 });
            await key(page, 'Enter');
            await waitForImage(page, '[role="dialog"] img', expected, mode === 'both-fail');
            check(await page.eval(() => document.getElementById('page-content').inert), 'keyboard opens lightbox');
            if (mode === 'remote' && language === 'pt-BR') await page.screenshot({ path: `${output}/${width}-${theme}-${route === '/' ? 'list' : 'case'}-zoom.jpg`, quality: 85 });
            await key(page, 'Escape');
            check(await page.eval(selector => !document.querySelector('[role="dialog"]') && document.activeElement === document.querySelector(selector), selector), 'Escape restores trigger focus');
          }
          if (mode === 'both-fail') {
            const before = requests;
            await sleep(500);
            check(requests === before, `failed fallback does not loop (${before} requests before wait, ${requests} after)`);
          }
          check(page.consoleErrors.length === 0, 'no runtime exceptions');
          off();
          await page.close();
        }
      }
    }
  }
  console.log(`PASS: ${passed} ${slug} image checks. Screenshots: ${output}`);
} finally { await browser.close(); }
