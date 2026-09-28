import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { experiences } from '../data/experience';
import { useI18n } from '../i18n/I18nContext';

export const ExperienceTimeline: React.FC = () => {
  const { language, t } = useI18n();

  return (
    <section id="experience" className="py-16 md:py-24 border-b border-border" aria-label="Professional Experience">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <span className="font-semibold">{t('experience.sectionBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3">
            {t('experience.title')}
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl">
            {t('experience.subtitle')}
          </p>
        </div>

        {/* Clean Vertical Timeline */}
        <div className="relative pl-6 sm:pl-8 border-l border-border space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative group">
              {/* Timeline marker */}
              <div
                className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-bg transition-colors ${
                  index === 0
                    ? 'border-accent ring-4 ring-accent-subtle'
                    : 'border-border-strong group-hover:border-accent'
                }`}
                aria-hidden="true"
              />

              <div className="rounded-lg border border-border bg-surface p-6 sm:p-7 shadow-2xs hover:border-accent transition-colors">
                {/* Header: Company & Period */}
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3 pb-3 border-b border-border">
                  <div>
                    <h3 className="text-lg font-bold text-text group-hover:text-accent transition-colors">
                      {exp.company}
                    </h3>
                    <div className="text-xs sm:text-sm font-mono text-accent font-medium mt-0.5">
                      {exp.area[language]}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-surface-muted text-xs font-mono text-text-muted border border-border/70">
                    <Calendar className="w-3.5 h-3.5 text-text-subtle" />
                    <span>{exp.period[language]}</span>
                  </div>
                </div>

                {/* Narrative description */}
                <p className="text-xs sm:text-sm text-text-muted leading-relaxed mb-5">
                  {exp.description[language]}
                </p>

                {/* Technical Responsibilities */}
                <div className="space-y-2 mb-6">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-text-subtle">
                    {language === 'pt-BR' ? 'Atribuições Técnicas:' : 'Technical Responsibilities:'}
                  </h4>
                  <ul className="space-y-1.5 text-xs text-text-muted">
                    {exp.responsibilities[language].map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2.5">
                        <span className="text-accent font-bold select-none leading-none mt-1">›</span>
                        <span className="leading-normal">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Stack Tags */}
                <div className="pt-4 border-t border-border/60 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono text-text-subtle mr-1">Stack:</span>
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded bg-surface-subtle border border-border text-[11px] font-mono text-text-muted"
                    >
                      {tech}
                    </span>
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
