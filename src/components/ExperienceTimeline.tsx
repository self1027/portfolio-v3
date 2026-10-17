import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { experiences } from '../data/experience';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';
import { SectionHeader } from './SectionHeader';
export const ExperienceTimeline: React.FC = () => {
  const { language, t } = useI18n();
  return (
    <section id="experience" className="section">
      <div className="shell">
        <SectionHeader title={t('experience.title')} subtitle={t('experience.subtitle')} />
        {experiences.map((exp, index) => (
          <article className="experience-row scroll-reveal" key={exp.id}>
            <div>
              <p className="experience-period">{exp.period[language]}</p>
              <h3 className="experience-company">{exp.company}</h3>
              <p className="experience-role">{exp.area[language]}</p>
              {index === 0 && <Link to="/projects/livro" className="text-link mt-4">{t('experience.caseLink')}<ArrowUpRight aria-hidden="true" /></Link>}
            </div>
            <div className="experience-body">
              <p>{exp.description[language]}</p>
              <ul>{exp.responsibilities[language].slice(0, 4).map(resp => <li key={resp}>{resp}</li>)}</ul>
              {exp.responsibilities[language].length > 4 && <details className="experience-extra">
                <summary>{t('experience.more')}</summary>
                <ul>{exp.responsibilities[language].slice(4).map(resp => <li key={resp}>{resp}</li>)}</ul>
              </details>}
              <div className="experience-stack" translate="no">{exp.technologies.join(' / ')}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
