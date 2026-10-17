import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { SectionHeader } from './SectionHeader';
const repositories = [
  { name: 'Livro', repo: 'Livro', key: 'livro' },
  { name: 'Integra', repo: 'INTEGRA', key: 'integra' },
  { name: 'ASCII Cam', repo: 'ascii-cam', key: 'ascii' },
  { name: 'Infinity Tic-Tac-Toe', repo: 'infinity-ttt', key: 'infinity' },
  { name: 'NoBSDownloader', repo: 'NoBSDownloader', key: 'nobs' },
];
export const GithubSection: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="github" className="section">
      <div className="shell github-layout">
        <div className="scroll-reveal">
          <SectionHeader title={t('github.title')} subtitle={t('github.subtitle')} />
          <a href="https://github.com/self1027" target="_blank" rel="noopener noreferrer" className="text-link">
            {t('github.cta')}<ArrowUpRight aria-hidden="true" />
          </a>
          <p className="skill-note">{t('github.selection')}</p>
        </div>
        <div>
          {repositories.map(repo => (
            <a className="repo-row scroll-reveal" key={repo.repo} href={'https://github.com/self1027/' + repo.repo} target="_blank" rel="noopener noreferrer">
              <div><p className="repo-name">{repo.name}</p><p className="repo-description">{t('github.' + repo.key)}</p></div>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
