// Browser regression checks. Start Vite first: npm run dev.
// Uses the installed Taste Skill's zero-dependency Chrome/Edge driver (Node 22+).
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { Browser, sleep } from '../.agents/skills/taste-skill/scripts/lib/cdp.mjs';

const origin = process.argv[2] || 'http://127.0.0.1:3000';
const output = '.taste-skill/browser-review';
mkdirSync(output, { recursive: true });
let passed = 0;
function check(condition, label) { assert.ok(condition, label); passed++; }
const browser = await Browser.launch();
const key = async (page, value, modifiers = 0) => {
  const code = { Tab: 9, Enter: 13, Escape: 27, ArrowRight: 39 }[value];
  await page.send('Input.dispatchKeyEvent', { type: 'keyDown', key: value, code: value, windowsVirtualKeyCode: code, modifiers, ...(value === 'Enter' ? { text: '\r', unmodifiedText: '\r' } : {}) });
  await page.send('Input.dispatchKeyEvent', { type: 'keyUp', key: value, code: value, windowsVirtualKeyCode: code, modifiers });
};
const settle = () => sleep(180);
try {
  for (const width of [1440, 768, 390, 320]) {
    for (const language of ['pt-BR', 'en-US']) {
      const theme = language === 'pt-BR' ? 'dark' : 'light';
      const page = await browser.newPage({ width, height: 900, mobile: width < 600, reducedMotion: true });
      await page.send('Page.addScriptToEvaluateOnNewDocument', { source: `localStorage.setItem('murilo_portfolio_lang', '${language}'); localStorage.setItem('murilo_portfolio_theme', '${theme}');` });
      await page.goto(origin, { settleMs: 700 });
      const state = await page.eval(() => ({
        lang: document.documentElement.lang,
        theme: document.documentElement.style.colorScheme,
        overflow: document.documentElement.scrollWidth > innerWidth,
        heading: document.querySelector('h1')?.textContent,
        downloads: [...document.querySelectorAll('a[download]')].map(a => a.getAttribute('href')),
        actions: [...document.querySelectorAll('.hero-actions a')].map(a => a.getBoundingClientRect().bottom),
        focus: document.activeElement.tagName,
        images: [...document.images].every(img => img.hasAttribute('width') && img.hasAttribute('height') && img.hasAttribute('alt')),
        missingKeys: /(?:hero|nav|projects|skills|contact)\.[a-zA-Z]+/.test(document.body.innerText),
        animations: document.getAnimations().length,
      }));
      check(state.lang === language && state.theme === theme, `${width}: language and theme`);
      check(!state.overflow, `${width}/${language}: no horizontal page overflow`);
      check(state.heading === 'Murilo Dias.' && !state.missingKeys, `${width}/${language}: complete homepage`);
      check(state.downloads.some(url => url.endsWith(language === 'pt-BR' ? '_CV.pdf' : '_Resume.pdf')), `${width}: localized resume`);
      check(state.actions.every(bottom => bottom < 900), `${width}/${language}: project and resume actions in first viewport`);
      check(state.images && state.animations === 0, `${width}: image dimensions and reduced motion`);
      check(state.focus === 'BODY', `${width}: no focus stolen on initial load`);
      await page.eval(() => document.querySelector('.header-controls button:nth-child(2)').click());
      check(await page.eval(original => document.documentElement.style.colorScheme !== original, theme), `${width}: theme control works`);
      await page.eval(() => document.querySelector('.header-controls button:nth-child(2)').click());
      if (width !== 320) await page.screenshot({ path: `${output}/home-${width}-${language}-${theme}.jpg`, quality: 85 });
      if (width === 390 && language === 'pt-BR') {
        await key(page, 'Tab');
        check(await page.eval(() => document.activeElement.classList.contains('skip-link')), 'skip link is first keyboard target');
        await key(page, 'Enter');
        await settle();
        check(await page.eval(() => document.activeElement.id === 'main-content'), 'skip link focuses main');
        await page.eval(() => document.querySelector('.mobile-toggle').focus());
        await key(page, 'Enter');
        await settle();
        await key(page, 'Tab');
        check(await page.eval(() => document.activeElement.closest('#mobile-navigation') !== null), 'menu links reachable by keyboard');
        await key(page, 'Escape');
        check(await page.eval(() => !document.getElementById('mobile-navigation') && document.activeElement.classList.contains('mobile-toggle')), 'Escape closes menu and restores focus');
      }
      await page.eval(() => document.querySelector('.hero-actions a').click());
      await settle();
      check(await page.eval(() => location.hash === '#projects' && document.activeElement.id === 'projects'), 'anchor preserves URL and focus');
      await page.eval(() => document.querySelector('.project-actions a').click());
      await settle();
      check(await page.eval(() => location.pathname === '/projects/livro' && document.activeElement.tagName === 'H1' && document.title.includes('Livro')), 'case route, focus and title');
      check(await page.eval(() => document.querySelector('meta[name="description"]').content.includes(document.querySelector('.case-subtitle').textContent)), 'case metadata matches content');
      check(await page.eval(() => document.documentElement.scrollWidth <= innerWidth), 'case has no page overflow');
      await page.eval(() => { const trigger = document.querySelector('.image-trigger'); trigger.focus(); trigger.click(); });
      await settle();
      check(await page.eval(() => document.querySelector('[role="dialog"]') && document.getElementById('page-content').inert), 'lightbox opens and background is inert');
      await key(page, 'Escape');
      check(await page.eval(() => !document.querySelector('[role="dialog"]') && !document.getElementById('page-content').inert && document.activeElement.classList.contains('image-trigger')), 'lightbox closes and returns focus');
      if (width === 390 && language === 'pt-BR') {
        await page.eval(() => document.querySelector('.architecture-figure .text-link').click());
        await key(page, 'Tab');
        check(await page.eval(() => document.activeElement.classList.contains('lightbox-content')), 'diagram scroller has keyboard focus');
        await key(page, 'ArrowRight');
        await sleep(350);
        check(await page.eval(() => document.querySelector('.lightbox-content').scrollLeft > 0), 'arrow key scrolls enlarged diagram');
        await key(page, 'Escape');
      }
      await page.eval(() => document.querySelector('.case-toc a[href="#architecture"]').click());
      await settle();
      check(await page.eval(() => location.hash === '#architecture' && document.activeElement.id === 'architecture'), 'case deep link focuses section');
      await page.eval(() => history.back());
      await settle();
      check(await page.eval(() => location.pathname === '/projects/livro' && !location.hash), 'back restores previous location');
      if (width === 390) await page.screenshot({ path: `${output}/case-${language}.jpg`, quality: 85 });
      check(page.consoleErrors.length === 0, `no runtime exceptions: ${page.consoleErrors.join('; ')}`);
      await page.close();
    }
  }
  const page = await browser.newPage({ width: 390, height: 844, mobile: true });
  await page.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
  await page.goto(origin, { settleMs: 100 });
  check(await page.eval(() => document.getAnimations().length > 0), 'motion runs when reduced motion is disabled');
  await page.eval(() => document.querySelector('button[aria-label="Mudar para Português"]')?.click());
  await page.eval(() => document.querySelector('.desktop-nav a[href="#contact"]')?.click());
  await settle();
  await page.eval(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.resolve() } });
    document.querySelector('.contact-buttons button').click();
  });
  await settle();
  check(await page.eval(() => document.querySelector('.contact-status').textContent.includes('copiado')), 'clipboard success is announced');
  await page.eval(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: () => Promise.reject(new Error('Denied')) } });
    document.querySelector('.contact-buttons button').click();
  });
  await settle();
  check(await page.eval(() => document.querySelector('.contact-status').textContent.includes('Não foi possível')), 'clipboard failure gives a useful fallback');
  for (const slug of ['livro', 'integra', 'ascii-cam', 'infinity-ttt', 'nobsdownloader']) {
    await page.goto(`${origin}/projects/${slug}`, { settleMs: 150 });
    check(await page.eval(() => !!document.querySelector('.case-overview') && !document.querySelector('.not-found')), `direct route ${slug}`);
    check(await page.eval(() => document.documentElement.scrollWidth <= innerWidth), `direct route ${slug}: no page overflow`);
  }
  await page.goto(origin + '/#%', { settleMs: 150 });
  check(page.consoleErrors.length === 0, 'malformed hash does not crash');
  await page.goto(origin + '/does-not-exist', { settleMs: 150 });
  check(await page.eval(() => !!document.querySelector('.not-found') && !document.querySelector('.hero')), 'unknown route renders not-found page');
  for (const filename of ['MuriloDias_CV.pdf', 'MuriloDias_Resume.pdf']) {
    const response = await fetch(`${origin}/media/${filename}`);
    check(response.ok && (await response.text()).startsWith('%PDF-'), `${filename}: actual downloadable PDF`);
  }
  await page.close();
  console.log(`PASS: ${passed} browser checks. Screenshots: ${output}`);
} finally { await browser.close(); }
