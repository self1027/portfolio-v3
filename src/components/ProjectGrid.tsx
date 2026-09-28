import React from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { useI18n } from '../i18n/I18nContext';

interface ProjectGridProps {
  projects: Project[];
  onZoomImage: (src: string, alt: string, caption?: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onZoomImage,
}) => {
  const { t } = useI18n();

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-border" aria-label="Featured Projects">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <span className="font-semibold">{t('projects.sectionBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3">
            {t('projects.title')}
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onZoomImage={onZoomImage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
