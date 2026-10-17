import React from 'react';
import { ArrowRight, ArrowUpRight, ZoomIn } from 'lucide-react';
import type { Project } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';
interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onZoomImage: (src: string, alt: string, caption?: string) => void;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured, onZoomImage }) => {
  const { language, t } = useI18n();
  return (
    <article className={'project-work scroll-reveal' + (featured ? ' featured' : '')} aria-labelledby={'project-' + project.id}>
      <div>
        <h3 className="project-name" id={'project-' + project.id}>{project.displayName}</h3>
        <p className="project-summary">{project.shortDescription[language]}</p>
        <p className="project-context"><strong>{t('projects.decisionLabel')} </strong>{project.engineeringDecision[language]}</p>
        {project.outcome && <p className="project-context"><strong>{t('projects.outcomeLabel')} </strong>{project.outcome[language]}</p>}
        <p className="project-stack" translate="no">{project.technologies.join(' / ')}</p>
        <div className="project-actions">
          <Link to={project.caseStudyRoute} className="text-link case-link" aria-label={t('projects.viewCaseStudy') + ': ' + project.displayName}>{t('projects.viewCaseStudy')}<ArrowRight aria-hidden="true" /></Link>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={t('projects.viewCode') + ': ' + project.displayName}>{t('projects.viewCode')}<ArrowUpRight aria-hidden="true" /></a>
          {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="text-link" aria-label={t('projects.viewDemo') + ': ' + project.displayName}>{t('projects.viewDemo')}<ArrowUpRight aria-hidden="true" /></a>}
        </div>
      </div>
      <figure className="project-visual">
        <button type="button" className="image-trigger" onClick={() => onZoomImage(project.image, project.imageAlt[language], project.displayName)} aria-label={t('projects.zoomImage') + ': ' + project.displayName}>
          <img src={project.image} alt={project.imageAlt[language]} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" />
          <span className="image-hint"><ZoomIn aria-hidden="true" /></span>
        </button>
        <figcaption>{project.previewCaption[language]}</figcaption>
      </figure>
    </article>
  );
};
