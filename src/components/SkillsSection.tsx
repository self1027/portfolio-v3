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

export const SkillsSection: React.FC = () => {
  const { language, t } = useI18n();

  return (
    <section id="skills" className="py-16 md:py-24 bg-surface-subtle border-b border-border" aria-label="Technical Skills">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
            <span className="font-semibold">{t('skills.sectionBadge')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3">
            {t('skills.title')}
          </h2>
          <p className="text-sm sm:text-base text-text-muted max-w-2xl">
            {t('skills.subtitle')}
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id] || Cpu;
            return (
              <div
                key={category.id}
                className="rounded-lg border border-border bg-surface p-6 transition-all duration-200 hover:border-accent flex flex-col justify-between"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
                    <div className="p-2 rounded bg-surface-muted text-accent">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-mono font-semibold text-sm text-text">
                      {category.title[language]}
                    </h3>
                  </div>

                  {/* Skills List (clean technical tags with subtle border) */}
                  <ul className="space-y-2 font-mono text-xs">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className="flex items-center justify-between py-1.5 px-2.5 rounded bg-surface-subtle border border-border/60 hover:border-accent/60 transition-colors"
                      >
                        <span className="text-text font-medium">{skill}</span>
                        <span className="text-[10px] text-text-subtle">verified</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-[11px] font-mono text-text-subtle flex items-center justify-between">
                  <span>cat: {category.id}</span>
                  <span className="text-accent">{category.skills.length} skills</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
