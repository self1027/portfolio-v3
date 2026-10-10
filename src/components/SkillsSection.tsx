import React from 'react';
import { Database, Server, Radio, Cloud, Terminal, Cpu } from 'lucide-react';
import { skillCategories } from '../data/skills';
import { useI18n } from '../i18n/I18nContext';

const categoryIcons: Record<string, React.ElementType> = {
  backend: Server,
  databases: Database,
  'realtime-media': Radio,
  'cloud-infra': Cloud,
  'tooling-automation': Terminal,
};
import { SectionHeader } from './SectionHeader';

export const SkillsSection: React.FC = () => {
  const { language, t } = useI18n();

  return (
    <section id="skills" className="py-16 md:py-24 bg-surface-subtle border-b border-border" aria-label="Technical Skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <SectionHeader
          badge={t('skills.sectionBadge')}
          title={t('skills.title')}
          subtitle={t('skills.subtitle')}
        />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <div
                key={category.id}
                className="rounded-lg border border-border bg-surface p-6 transition-colors hover:border-border-strong flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-5 pb-3 border-b border-border/70">
                    <Icon className="w-4 h-4 text-accent" />
                    <h3 className="font-semibold text-sm text-text">
                      {category.title[language]}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <ul className="space-y-2 font-mono text-xs">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="py-1.5 px-3 rounded bg-surface-subtle border border-border/60 text-text font-medium"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
