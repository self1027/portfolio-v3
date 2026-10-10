import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { experiences } from '../data/experience';
import { useI18n } from '../i18n/I18nContext';

import { SectionHeader } from './SectionHeader';

export const ExperienceTimeline: React.FC = () => {
  const { language, t } = useI18n();

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-border" aria-label="Professional Experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge={t('experience.sectionBadge')}
          title={t('experience.title')}
          subtitle={t('experience.subtitle')}
        />

        {/* Clean Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-border space-y-10">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-2 w-3.5 h-3.5 rounded-full border-2 bg-bg transition-colors ${
                  index === 0 ? 'border-accent' : 'border-border-strong'
                }`}
                aria-hidden="true"
              />

              <div className="rounded-lg border border-border bg-surface p-6 sm:p-7 transition-colors hover:border-border-strong">
                {/* Header: Company, Area & Period */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3 pb-3 border-b border-border/70">
                  <div>
                    <h3 className="text-lg font-bold text-text">
                      {exp.company}
                    </h3>
                    <p className="text-xs sm:text-sm text-accent font-medium mt-0.5">
                      {exp.area[language]}
                    </p>
                  </div>

                  <span className="text-xs font-mono text-text-subtle">
                    {exp.period[language]}
                  </span>
                </div>

                {/* Narrative description */}
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5">
                  {exp.description[language]}
                </p>

                {/* Technical Responsibilities */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-mono font-medium text-text-subtle uppercase tracking-wider">
                    {language === 'pt-BR' ? 'Atribuições Principais' : 'Key Responsibilities'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-muted">
                    {exp.responsibilities[language].map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="text-text-subtle select-none mt-0.5" aria-hidden="true">•</span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Stack */}
                <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono text-text-subtle">
                  <span className="text-text-muted font-medium mr-1">Stack:</span>
                  {exp.technologies.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < exp.technologies.length - 1 && (
                        <span className="text-border" aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
