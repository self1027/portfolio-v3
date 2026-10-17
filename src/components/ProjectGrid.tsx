import React from 'react';
import type { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { useI18n } from '../i18n/I18nContext';
import { SectionHeader } from './SectionHeader';
interface ProjectGridProps {
  projects: Project[];
  onZoomImage: (src: string, alt: string, caption?: string) => void;
}
export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onZoomImage }) => {
  const { t } = useI18n();
  return (
    <section id="projects" className="section projects-section">
      <div className="shell">
        <SectionHeader title={t('projects.title')} subtitle={t('projects.subtitle')} />
        <div>{projects.map((project, index) => <ProjectCard key={project.id} project={project} featured={index === 0} onZoomImage={onZoomImage} />)}</div>
      </div>
    </section>
  );
};
