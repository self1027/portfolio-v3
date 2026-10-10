import React from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { useI18n } from '../i18n/I18nContext';

import { SectionHeader } from './SectionHeader';

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
        <SectionHeader
          badge={t('projects.sectionBadge')}
          title={t('projects.title')}
          subtitle={t('projects.subtitle')}
        />

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
