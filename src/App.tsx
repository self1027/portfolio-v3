import React, { useCallback, useEffect, useState } from 'react';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { ThemeProvider } from './theme/ThemeContext';
import { RouterProvider, useRouter, Link } from './router/RouterContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ImpactHighlights } from './components/ImpactHighlights';
import { ProjectGrid } from './components/ProjectGrid';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { GithubSection } from './components/GithubSection';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { CaseStudyLayout } from './components/CaseStudyLayout';
import { ImageLightbox } from './components/ImageLightbox';
import { projects } from './data/projects';
import { caseStudies } from './data/caseStudies';

const MainContent: React.FC = () => {
  const { path } = useRouter();
  const { language, t } = useI18n();
  const [lightbox, setLightbox] = useState<{ src: string | null; alt: string; caption?: string }>({ src: null, alt: '' });
  const zoom = useCallback((src: string, alt: string, caption?: string) => setLightbox({ src, alt, caption }), []);
  const close = useCallback(() => setLightbox({ src: null, alt: '' }), []);
  const slug = path.startsWith('/projects/') ? path.slice('/projects/'.length).replace(/\/$/, '') : '';
  const currentCase = caseStudies[slug];
  const isHome = path === '/';
  useEffect(() => { close(); }, [path, close]);
  useEffect(() => {
    const title = currentCase ? currentCase.title + ' | Murilo Dias' : isHome ? 'Murilo Dias | Backend Developer · Node.js & TypeScript' : t('notFound.title') + ' | Murilo Dias';
    const description = currentCase ? currentCase.subtitle[language] : t('hero.description');
    document.title = title;
    for (const selector of ['meta[name="description"]', 'meta[property="og:description"]', 'meta[name="twitter:description"]']) document.querySelector(selector)?.setAttribute('content', description);
    for (const selector of ['meta[property="og:title"]', 'meta[name="twitter:title"]']) document.querySelector(selector)?.setAttribute('content', title);
    document.querySelector('meta[property="og:locale"]')?.setAttribute('content', language.replace('-', '_'));
  }, [currentCase, isHome, language, t]);
  return (
    <>
      <div id="page-content">
        <a href="#main-content" className="skip-link">{t('nav.skip')}</a>
        <Header />
        <main id="main-content" tabIndex={-1}>
          {currentCase ? <CaseStudyLayout data={currentCase} allSlugs={projects.map(project => project.slug)} onZoomImage={zoom} /> : isHome ? <>
            <Hero />
            <ProjectGrid projects={projects} onZoomImage={zoom} />
            <ImpactHighlights />
            <ExperienceTimeline />
            <SkillsSection />
            <GithubSection />
            <ContactCTA />
          </> : <section className="not-found shell">
            <h1 className="section-title">{t('notFound.title')}</h1>
            <p className="section-description">{t('notFound.description')}</p>
            <Link to="/#projects" className="action mt-8">{t('notFound.action')}</Link>
          </section>}
        </main>
        <Footer />
      </div>
      <ImageLightbox src={lightbox.src} alt={lightbox.alt} caption={lightbox.caption} onClose={close} />
    </>
  );
};
export default function App() {
  return <ThemeProvider><I18nProvider><RouterProvider><MainContent /></RouterProvider></I18nProvider></ThemeProvider>;
}
