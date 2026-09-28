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
        <div className="mb-8 pb-4 border-b border-border flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-mono text-text-muted hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t('caseStudy.backToProjects')}</span>
          </Link>

          <span className="text-xs font-mono text-text-subtle">
            case-study // {data.slug}
          </span>
        </div>

        {/* Case Study Header */}
        <header className="mb-10">
          <div className="text-xs font-mono text-accent font-semibold mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>ARCHITECTURAL CASE STUDY</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text mb-4 leading-tight">
            {data.title}
          </h1>
          <p className="text-base sm:text-xl font-mono text-text-muted leading-relaxed mb-6">
            {data.subtitle[language]}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {data.technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded bg-surface border border-border text-xs font-mono text-text shadow-2xs"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* External Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-4 border-t border-border">
            <a
              href={data.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-border hover:border-accent text-text transition-colors"
            >
              <Github className="w-4 h-4 text-accent" />
              <span>Ver Repositório no GitHub</span>
            </a>

            {data.demoUrl && (
              <a
                href={data.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface border border-border hover:border-accent text-accent transition-colors"
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
          <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface shadow-2xs transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-mono font-bold text-accent flex items-center gap-2.5">
                <span className="text-text-subtle font-mono text-sm px-2 py-0.5 rounded bg-surface-subtle border border-border">
                  {getNextNumber()}
                </span>
                <span>{t('caseStudy.problem')}</span>
              </h2>
              <span className="text-xs font-mono text-text-subtle hidden sm:inline">context // diagnostic</span>
            </div>
            <div className="space-y-3.5 text-text-muted text-sm sm:text-base">
              {data.problem[language].map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Section 02: Technical Challenges */}
          {data.technicalChallenges && (
            <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface-subtle shadow-2xs transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-mono font-bold text-text flex items-center gap-2.5">
                  <span className="text-accent font-mono text-sm px-2 py-0.5 rounded bg-surface border border-border">
                    {getNextNumber()}
                  </span>
                  <span>{t('caseStudy.challenges')}</span>
                </h2>
                <span className="text-xs font-mono text-text-subtle hidden sm:inline">constraints // hurdles</span>
              </div>
              <ul className="space-y-3 text-sm sm:text-base text-text-muted">
                {data.technicalChallenges[language].map((challenge, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent font-mono font-bold text-base select-none">›</span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Section 03: Architecture Decision */}
          <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface shadow-2xs transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-mono font-bold text-accent flex items-center gap-2.5">
                <span className="text-text-subtle font-mono text-sm px-2 py-0.5 rounded bg-surface-subtle border border-border">
                  {getNextNumber()}
                </span>
                <span>{data.decision.title[language]}</span>
              </h2>
              <span className="text-xs font-mono text-text-subtle hidden sm:inline">strategy // tradecraft</span>
            </div>
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
            <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface shadow-2xs transition-all">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-mono font-bold text-text flex items-center gap-2.5">
                  <span className="text-accent font-mono text-sm px-2 py-0.5 rounded bg-surface-subtle border border-border">
                    {getNextNumber()}
                  </span>
                  <span>{data.pipelineOrSections.title[language]}</span>
                </h2>
                <span className="text-xs font-mono text-text-subtle hidden sm:inline">data-flow // pipeline</span>
              </div>
              <div className="space-y-4">
                {data.pipelineOrSections.items.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded border border-border bg-surface-subtle/50 space-y-1.5 transition-colors hover:border-accent/40"
                  >
                    <h3 className="text-sm font-mono font-bold text-accent flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span>{step.subtitle[language]}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-text-muted pl-3.5 leading-relaxed">
                      {step.text[language]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section 05: Code Snippets & Implementation */}
          <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface shadow-2xs transition-all">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-mono font-bold text-text flex items-center gap-2.5">
                <span className="text-accent font-mono text-sm px-2 py-0.5 rounded bg-surface-subtle border border-border">
                  {getNextNumber()}
                </span>
                <span>{t('caseStudy.code')}</span>
              </h2>
              <span className="text-xs font-mono text-text-subtle hidden sm:inline">implementation // snippets</span>
            </div>
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
          <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface-subtle shadow-2xs transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-mono font-bold text-text flex items-center gap-2.5">
                <span className="text-amber-500 font-mono text-sm px-2 py-0.5 rounded bg-surface border border-border">
                  {getNextNumber()}
                </span>
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-500" />
                  <span>{t('caseStudy.tradeoffs')}</span>
                </span>
              </h2>
              <span className="text-xs font-mono text-text-subtle hidden sm:inline">engineering-decisions</span>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-text-muted">
              {data.tradeOffs[language].map((tradeoff, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-amber-500 font-bold mt-0.5 select-none">•</span>
                  <span>{tradeoff}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 07: Result if present */}
          {data.result && (
            <section className="p-6 sm:p-7 rounded-lg border border-accent/40 bg-accent-subtle/15 shadow-2xs transition-all">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-mono font-bold text-accent flex items-center gap-2.5">
                  <span className="text-accent font-mono text-sm px-2 py-0.5 rounded bg-surface border border-accent/40">
                    {getNextNumber()}
                  </span>
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent" />
                    <span>{t('caseStudy.result')}</span>
                  </span>
                </h2>
                <span className="text-xs font-mono text-accent hidden sm:inline font-bold">verified // production</span>
              </div>
              <div className="space-y-3 text-xs sm:text-sm text-text">
                {data.result[language].map((res, idx) => (
                  <p key={idx} className="font-medium leading-relaxed">{res}</p>
                ))}
              </div>
            </section>
          )}

          {/* Section 08: What this project demonstrates */}
          <section className="p-6 sm:p-7 rounded-lg border border-border bg-surface shadow-2xs transition-all">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-mono font-bold text-text flex items-center gap-2.5">
                <span className="text-accent font-mono text-sm px-2 py-0.5 rounded bg-surface-subtle border border-border">
                  {getNextNumber()}
                </span>
                <span className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-accent" />
                  <span>{t('caseStudy.demonstrates')}</span>
                </span>
              </h2>
              <span className="text-xs font-mono text-text-subtle hidden sm:inline">core-competencies</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono text-text-muted">
              {data.demonstrates[language].map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded bg-surface-subtle border border-border/70 hover:border-accent/50 transition-colors"
                >
                  <span className="text-accent font-bold">✓</span>
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
