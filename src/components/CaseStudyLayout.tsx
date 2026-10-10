import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  Code2,
  Workflow,
  Sparkles,
} from 'lucide-react';
import type { CaseStudyData } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { useRouter, Link } from '../router/RouterContext';
import { CodeBlock } from './CodeBlock';
import { ArchitectureImage } from './ArchitectureImage';

interface CaseStudyLayoutProps {
  data: CaseStudyData;
  allSlugs: string[];
  onZoomImage: (src: string, alt: string, caption?: string) => void;
}

export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({
  data,
  allSlugs,
  onZoomImage,
}) => {
  const { language, t } = useI18n();
  const { navigate } = useRouter();

  // Dynamic document title for SEO
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${data.title} | Murilo Dias`;
    window.scrollTo(0, 0);
    return () => {
      document.title = originalTitle;
    };
  }, [data.title, data.slug]);

  // Determine previous and next case studies
  const currentIndex = allSlugs.indexOf(data.slug);
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : allSlugs[allSlugs.length - 1];
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : allSlugs[0];

  // Helper to format 2-digit section numbers sequentially
  let currentCardIndex = 0;
  const getNextNumber = () => {
    currentCardIndex += 1;
    return String(currentCardIndex).padStart(2, '0') + '.';
  };

  return (
    <article className="py-10 md:py-16 bg-bg text-text min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-8 pb-4 border-b border-border flex items-center justify-between text-xs font-mono">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('caseStudy.backToProjects')}</span>
          </Link>

          <span className="text-text-subtle">
            {data.slug}
          </span>
        </div>

        {/* Case Study Header */}
        <header className="mb-12">
          <p className="text-xs font-mono font-medium text-accent uppercase tracking-wider mb-2">
            Case Study
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text mb-3 leading-tight">
            {data.title}
          </h1>
          <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-6">
            {data.subtitle[language]}
          </p>

          {/* Technology metadata list */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs font-mono text-text-subtle mb-6">
            {data.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {idx < data.technologies.length - 1 && (
                  <span className="text-border" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-4 border-t border-border">
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-border hover:border-border-strong text-text transition-colors"
            >
              <Github className="w-4 h-4 text-accent" />
              <span>Ver Repositório no GitHub</span>
            </a>

            {data.demoUrl && (
              <a
                href={data.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-surface border border-border hover:border-border-strong text-accent transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Demo em Produção</span>
              </a>
            )}
          </div>
        </header>

        {/* Main Content Sections with Sequential Numbering */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-text">
          
          {/* Section 01: The Problem */}
          <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
              <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
              <span>{t('caseStudy.problem')}</span>
            </h2>
            <div className="space-y-3.5 text-text-muted text-sm sm:text-base">
              {data.problem[language].map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section 02: Technical Challenges */}
          {data.technicalChallenges && (
            <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
              <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
                <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
                <span>{t('caseStudy.challenges')}</span>
              </h2>
              <ul className="space-y-2.5 text-sm sm:text-base text-text-muted">
                {data.technicalChallenges[language].map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-text-subtle select-none mt-0.5">•</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section 03: Architecture Decision */}
          <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
              <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
              <span>{data.decision.title[language]}</span>
            </h2>
            <div className="space-y-3.5 text-text-muted text-sm sm:text-base mb-6">
              {data.decision.content[language].map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Architecture Diagrams */}
            {data.diagrams.map((diag, idx) => (
              <ArchitectureImage
                key={idx}
                src={diag.src}
                alt={diag.alt[language]}
                caption={diag.caption[language]}
                onZoom={onZoomImage}
              />
            ))}
          </section>

          {/* Section 04: Pipeline / Architecture Breakdown */}
          {data.pipelineOrSections && (
            <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
              <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
                <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
                <span>{data.pipelineOrSections.title[language]}</span>
              </h2>
              <div className="space-y-4">
                {data.pipelineOrSections.items.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-md border border-border/80 bg-surface-subtle space-y-1.5"
                  >
                    <h3 className="text-sm font-semibold text-text">
                      {step.subtitle[language]}
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                      {step.text[language]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 05: Code Snippets & Implementation */}
          <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-6">
              <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
              <span>{t('caseStudy.code')}</span>
            </h2>
            <div className="space-y-6">
              {data.codeSnippets.map((snippet, idx) => (
                <CodeBlock
                  key={idx}
                  code={snippet.code}
                  language={snippet.language}
                  title={snippet.title}
                  description={snippet.description ? snippet.description[language] : undefined}
                />
              ))}
            </div>
          </section>

          {/* Section 06: Trade-offs */}
          <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
              <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
              <span>{t('caseStudy.tradeoffs')}</span>
            </h2>
            <ul className="space-y-2.5 text-xs sm:text-sm text-text-muted">
              {data.tradeOffs[language].map((tradeoff, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-text-subtle select-none mt-0.5">•</span>
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 07: Result if present */}
          {data.result && (
            <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
              <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
                <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
                <span>{t('caseStudy.result')}</span>
              </h2>
              <div className="space-y-3 text-xs sm:text-sm text-text-muted">
                {data.result[language].map((res, idx) => (
                  <p key={idx} className="leading-relaxed">{res}</p>
                ))}
              </div>
            </section>
          )}

          {/* Section 08: What this project demonstrates */}
          <section className="p-6 sm:p-8 rounded-lg border border-border bg-surface">
            <h2 className="text-lg font-bold text-text flex items-center gap-2 mb-4">
              <span className="font-mono text-accent text-sm font-semibold">{getNextNumber()}</span>
              <span>{t('caseStudy.demonstrates')}</span>
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-text-muted">
              {data.demonstrates[language].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-md bg-surface-subtle border border-border/70"
                >
                  <span className="text-accent font-semibold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

        </div>

        {/* Previous / Next Project Navigation */}
        <nav
          className="mt-16 pt-8 border-t border-border flex items-center justify-between font-mono text-xs"
          aria-label="Case Study Navigation"
        >
          <Link
            to={`/projects/${prevSlug}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors p-2 rounded hover:bg-surface border border-transparent hover:border-border"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">{t('caseStudy.prevProject')}</span>
            <span className="font-bold">({prevSlug})</span>
          </Link>

          <Link
            to="/#projects"
            className="text-text-subtle hover:text-text px-3 py-1.5 rounded border border-border bg-surface hover:border-accent transition-colors"
          >
            {t('caseStudy.backToProjects')}
          </Link>

          <Link
            to={`/projects/${nextSlug}`}
            className="inline-flex items-center gap-2 text-text-muted hover:text-accent transition-colors p-2 rounded hover:bg-surface border border-transparent hover:border-border"
          >
            <span className="hidden sm:inline">{t('caseStudy.nextProject')}</span>
            <span className="font-bold">({nextSlug})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </nav>

      </div>
    </article>
  );
};
