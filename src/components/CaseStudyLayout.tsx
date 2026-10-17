import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { CaseStudyData } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';
import { CodeBlock } from './CodeBlock';
import { ArchitectureImage } from './ArchitectureImage';
import { projects } from '../data/projects';

interface CaseStudyLayoutProps {
  data: CaseStudyData;
  allSlugs: string[];
  onZoomImage: (src: string, alt: string, caption?: string) => void;
}
export const CaseStudyLayout: React.FC<CaseStudyLayoutProps> = ({ data, allSlugs, onZoomImage }) => {
  const { language, t } = useI18n();
  const project = projects.find(item => item.slug === data.slug);
  const index = allSlugs.indexOf(data.slug);
  const prev = index < 0 ? allSlugs[allSlugs.length - 1] : allSlugs[(index - 1 + allSlugs.length) % allSlugs.length];
  const next = allSlugs[(index + 1) % allSlugs.length];
  const name = (slug: string) => projects.find(item => item.slug === slug)?.displayName || slug;
  const nav = [
    ['problem', t('caseStudy.problem')], ['architecture', t('caseStudy.decision')],
    ['implementation', t('caseStudy.code')], ['tradeoffs', t('caseStudy.tradeoffs')],
  ];
  const paragraphs = (items: string[]) => <div className="case-prose">{items.map((item, i) => <p key={i}>{item}</p>)}</div>;
  const list = (items: string[]) => <ul className="case-list">{items.map((item, i) => <li key={i}>{item}</li>)}</ul>;
  return (
    <article className="case-study">
      <div className="case-shell">
        <Link to="/#projects" className="text-link case-breadcrumb"><ArrowLeft aria-hidden="true" />{t('caseStudy.backToProjects')}</Link>
        <header>
          <h1 className="case-title" tabIndex={-1}>{project?.displayName || 'NoBSDownloader'}</h1>
          <p className="case-subtitle">{data.subtitle[language]}</p>
          <p className="project-stack" translate="no">{data.technologies.join(' / ')}</p>
          <div className="project-actions">
            <a href={data.githubUrl} target="_blank" rel="noopener noreferrer" className="action">{t('caseStudy.source')}<ArrowUpRight aria-hidden="true" /></a>
            {data.demoUrl && <a href={data.demoUrl} target="_blank" rel="noopener noreferrer" className="text-link">{t('caseStudy.demo')}<ArrowUpRight aria-hidden="true" /></a>}
          </div>
        </header>
        <dl className="case-overview" aria-label={t('caseStudy.overview')}>
          <div><dt>{t('caseStudy.context')}</dt><dd>{project?.shortDescription[language] || data.problem[language][0]}</dd></div>
          <div><dt>{t('caseStudy.decisionSummary')}</dt><dd>{project?.engineeringDecision[language] || data.decision.content[language][0]}</dd></div>
          <div><dt>{t('caseStudy.resultSummary')}</dt><dd>{project?.outcome?.[language] || data.result?.[language][0] || data.tradeOffs[language][0]}</dd></div>
        </dl>
        <ArchitectureImage src={data.previewImage} alt={project?.imageAlt[language] || data.title} caption={project?.previewCaption[language] || t('caseStudy.preview')} onZoom={onZoomImage} />
        <nav className="case-toc" aria-label={t('caseStudy.navigate')}>
          {nav.map(([id, label]) => <Link key={id} to={'#' + id}>{label}</Link>)}
        </nav>
        <div className="case-content">
          <section id="problem" className="case-section">
            <h2>{t('caseStudy.problem')}</h2>{paragraphs(data.problem[language])}
          </section>
          {data.technicalChallenges && <section className="case-section">
            <h2>{t('caseStudy.challenges')}</h2>{list(data.technicalChallenges[language])}
          </section>}
          <section id="architecture" className="case-section">
            <h2>{t('caseStudy.decision')}</h2>
            <p className="case-decision-title">{data.decision.title[language]}</p>
            {paragraphs(data.decision.content[language])}
            {data.diagrams.map(diagram => <ArchitectureImage key={diagram.src} src={diagram.src} alt={diagram.alt[language]} caption={diagram.caption[language]} onZoom={onZoomImage} />)}
          </section>
          {data.pipelineOrSections && <section className="case-section">
            <h2>{t('caseStudy.howItWorks')}</h2>
            <p className="case-decision-title">{data.pipelineOrSections.title[language]}</p>
            <div className="pipeline-list">{data.pipelineOrSections.items.map((item, i) => (
              <div key={i}><h3>{item.subtitle[language].replace(/^\d+\.\s*/, '')}</h3><p>{item.text[language]}</p></div>
            ))}</div>
          </section>}
          <section id="implementation" className="case-section">
            <h2>{t('caseStudy.code')}</h2>
            <p className="section-description">{t('caseStudy.codeNote')}</p>
            {data.codeSnippets.map((snippet, i) => <CodeBlock key={i} code={snippet.code} language={snippet.language} title={language === 'pt-BR' ? snippet.title : snippet.titleEn || snippet.language} description={snippet.description?.[language]} />)}
          </section>
          <section id="tradeoffs" className="case-section">
            <h2>{t('caseStudy.tradeoffs')}</h2>{list(data.tradeOffs[language])}
          </section>
          {data.result && <section className="case-section"><h2>{t('caseStudy.result')}</h2>{paragraphs(data.result[language])}</section>}
          <section className="case-section"><h2>{t('caseStudy.demonstrates')}</h2>{list(data.demonstrates[language])}</section>
        </div>
        <nav className="case-navigation" aria-label={t('caseStudy.navigation')}>
          <Link to={'/projects/' + prev} className="text-link" aria-label={t('caseStudy.prevProject') + ': ' + name(prev)}><ArrowLeft aria-hidden="true" />{name(prev)}</Link>
          <Link to="/#projects" className="text-link">{t('caseStudy.backToProjects')}</Link>
          <Link to={'/projects/' + next} className="text-link" aria-label={t('caseStudy.nextProject') + ': ' + name(next)}>{name(next)}<ArrowRight aria-hidden="true" /></Link>
        </nav>
      </div>
    </article>
  );
};
