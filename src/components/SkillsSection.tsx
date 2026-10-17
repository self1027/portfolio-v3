import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';
import { SectionHeader } from './SectionHeader';
import { skillCategories } from '../data/skills';

const evidence = [
  { category: 'backend', tools: ['Node.js', 'Express', 'TypeScript', 'APIs REST', 'Socket.io'], project: 'Infinity Tic-Tac-Toe', route: '/projects/infinity-ttt#implementation' },
  { category: 'databases', tools: ['MySQL', 'Sequelize', 'Composite unique indexes'], project: 'Livro', route: '/projects/livro#architecture' },
  { category: 'realtime-media', tools: ['WebSockets', 'FFmpeg', 'Web Audio API', 'Vosk', 'Google Cloud STT'], project: 'Integra', route: '/projects/integra#architecture' },
  { category: 'cloud-infra', tools: ['Linux', 'Nginx', 'PM2'], project: 'Livro', route: '/projects/livro#implementation' },
  { category: 'performance', tools: ['Web Workers', 'Canvas 2D', 'Transferable Objects', 'Image processing'], project: 'ASCII Cam', route: '/projects/ascii-cam#implementation' },
];
export const SkillsSection: React.FC = () => {
  const { language, t } = useI18n();
  const labels: Record<string, string> = {
    backend: 'Backend',
    databases: language === 'pt-BR' ? 'Modelagem de dados' : 'Data modeling',
    'realtime-media': language === 'pt-BR' ? 'Áudio e tempo real' : 'Audio & real time',
    'cloud-infra': language === 'pt-BR' ? 'Infraestrutura' : 'Infrastructure',
    performance: language === 'pt-BR' ? 'Concorrência no navegador' : 'Browser concurrency',
  };
  const demonstrated = new Set(evidence.flatMap(row => row.tools));
  // Preserve the rest of the original inventory without claiming project evidence.
  const supplementary = [...new Set(skillCategories.flatMap(category => category.skills))]
    .filter(tool => !demonstrated.has(tool));
  return (
    <section id="skills" className="section skills-section">
      <div className="shell">
        <SectionHeader title={t('skills.title')} subtitle={t('skills.subtitle')} />
        {evidence.map(row => (
          <div className="skill-row scroll-reveal" key={row.category}>
            <h3>{labels[row.category]}</h3>
            <div>
              <p className="skill-tools" translate="no">{row.tools.join(' / ')}</p>
              <Link to={row.route} className="text-link">{t('skills.evidence')} {row.project}<ArrowUpRight aria-hidden="true" /></Link>
            </div>
          </div>
        ))}
        <details className="experience-extra">
          <summary>{t('skills.additional')}</summary>
          <p className="skill-note">{t('skills.additionalNote')}</p>
          <p className="skill-tools mt-3" translate="no">{supplementary.join(' / ')}</p>
        </details>
      </div>
    </section>
  );
};
