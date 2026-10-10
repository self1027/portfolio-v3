import React from 'react';
import { ExternalLink, Github, ArrowRight, ZoomIn, CheckCircle2, Terminal } from 'lucide-react';
import type { Project } from '../types';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';

interface ProjectCardProps {
  project: Project;
  onZoomImage: (src: string, alt: string, caption?: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onZoomImage,
}) => {
  const { language, t } = useI18n();

  return (
    <article className="group flex flex-col rounded-lg border border-border bg-surface overflow-hidden transition-colors hover:border-border-strong">
      {/* Project Image & Zoom trigger */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-muted/40 border-b border-border">
        <img
          src={project.image}
          alt={project.imageAlt[language]}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
        />

        {/* Zoom Button Overlay */}
        <button
          type="button"
          onClick={() => onZoomImage(project.image, project.imageAlt[language], project.title)}
          className="absolute top-2.5 right-2.5 z-10 p-1.5 rounded bg-black/70 text-white/90 hover:text-white hover:bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs focus-visible:opacity-100 cursor-pointer"
          aria-label={`${t('projects.zoomImage')}: ${project.title}`}
        >
          <ZoomIn className="w-4 h-4" />
        </button>

        {/* Technical Category Tag */}
        {project.badge && (
          <div className="absolute bottom-2.5 left-2.5 z-10 px-2 py-0.5 rounded bg-zinc-900/95 text-zinc-100 font-mono text-[10px] font-medium tracking-wide border border-zinc-700/80 backdrop-blur-xs">
            {project.badge[language]}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
        <div>
          {/* Subtitle / category */}
          <p className="text-xs font-mono text-text-subtle mb-1">
            {project.subtitle[language]}
          </p>

          {/* Title */}
          <h3 className="text-lg font-bold text-text mb-2 transition-colors">
            {project.title}
          </h3>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-4">
            {project.shortDescription[language]}
          </p>

          {/* Concrete Outcome Callout */}
          {project.outcome && (
            <div className="mb-4 text-xs font-mono text-text flex items-start gap-2">
              <span className="text-accent font-semibold shrink-0">{t('projects.outcomeLabel')}</span>
              <span className="text-text-muted">{project.outcome[language]}</span>
            </div>
          )}

          {/* Technologies list */}
          <div className="mb-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-text-subtle">
            {project.technologies.map((tech, idx) => (
              <React.Fragment key={tech}>
                <span>{tech}</span>
                {idx < project.technologies.length - 1 && (
                  <span className="text-border" aria-hidden="true">·</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Action Footers: Case study button, repo link, demo link */}
        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <Link
            to={project.caseStudyRoute}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent hover:text-accent-hover transition-colors py-1 group/btn"
          >
            <span>{t('projects.viewCaseStudy')}</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5" />
          </Link>

          <div className="flex items-center gap-3 text-xs font-mono text-text-muted">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-text transition-colors"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>{t('projects.viewCode')}</span>
            </a>

            {project.demoUrl ? (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-text transition-colors"
                aria-label={`Live demo for ${project.title}`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>{t('projects.viewDemo')}</span>
              </a>
            ) : (
              <span className="text-[10px] text-text-subtle font-mono">
                [CLI/Backend]
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
