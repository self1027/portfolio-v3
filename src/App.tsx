import React, { useState, useEffect } from 'react';
import { I18nProvider, useI18n } from './i18n/I18nContext';
import { ThemeProvider } from './theme/ThemeContext';
import { RouterProvider, useRouter } from './router/RouterContext';
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
  const { language } = useI18n();

  // State for image lightbox
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    src: string | null;
    alt: string;
    caption?: string;
  }>({
    isOpen: false,
    src: null,
    alt: '',
    caption: undefined,
  });

  const handleZoomImage = (src: string, alt: string, caption?: string) => {
    setLightboxState({
      isOpen: true,
      src,
      alt,
      caption,
    });
  };

  const handleCloseLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false, src: null }));
  };

  // Case study route detection
  const isCaseStudy = path.startsWith('/projects/');
  const caseStudySlug = isCaseStudy ? path.replace('/projects/', '').replace(/\/$/, '') : null;
  const currentCaseStudy = caseStudySlug ? caseStudies[caseStudySlug] : null;

  const allSlugs = projects.map((p) => p.slug);

  // Dynamic meta tags update based on language and route
  useEffect(() => {
    const metaDesc = document.querySelector('meta[name="description"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');

    if (!isCaseStudy) {
      if (language === 'pt-BR') {
        document.title = 'Murilo Dias | Backend Developer Node.js';
        if (metaDesc) metaDesc.setAttribute('content', 'Murilo Dias é desenvolvedor backend especializado em Node.js, APIs REST, WebSockets e sistemas em produção. Experiência com aplicações reais e processamento em tempo real.');
        if (ogTitle) ogTitle.setAttribute('content', 'Murilo Dias | Backend Developer Node.js');
        if (ogDesc) ogDesc.setAttribute('content', 'Desenvolvedor backend focado em Node.js, criando sistemas reais em produção com APIs escaláveis, processamento em tempo real e arquitetura orientada a eventos.');
      } else {
        document.title = 'Murilo Dias | Backend Developer';
        if (metaDesc) metaDesc.setAttribute('content', 'Backend Developer focused on Node.js, APIs, WebSockets, production systems, and real-time processing.');
        if (ogTitle) ogTitle.setAttribute('content', 'Murilo Dias | Backend Developer');
        if (ogDesc) ogDesc.setAttribute('content', 'Backend Developer focused on Node.js, building real production systems with scalable APIs, real-time processing, and event-driven architecture.');
      }
    }
  }, [language, isCaseStudy]);

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text selection:bg-accent/20 selection:text-accent font-sans">
      <Header />

      <main className="flex-1">
        {isCaseStudy && currentCaseStudy ? (
          <CaseStudyLayout
            data={currentCaseStudy}
            allSlugs={allSlugs}
            onZoomImage={handleZoomImage}
          />
        ) : (
          <>
            <Hero />
            <ImpactHighlights />
            <ProjectGrid
              projects={projects}
              onZoomImage={handleZoomImage}
            />
            <SkillsSection />
            <ExperienceTimeline />
            <GithubSection />
            <ContactCTA />
          </>
        )}
      </main>

      <Footer />

      {/* Global Image Lightbox Modal */}
      <ImageLightbox
        src={lightboxState.src}
        alt={lightboxState.alt}
        caption={lightboxState.caption}
        onClose={handleCloseLightbox}
      />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <RouterProvider>
          <MainContent />
        </RouterProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
