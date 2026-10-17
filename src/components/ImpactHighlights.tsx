import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';
export const ImpactHighlights: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="section ownership-section">
      <div className="shell ownership-layout">
        <div className="scroll-reveal">
          <h2 className="section-title">{t('impact.title')}</h2>
          <p className="ownership-intro">{t('impact.description')}</p>
          <Link to="/projects/livro#architecture" className="text-link mt-6">{t('impact.cta')}<ArrowUpRight aria-hidden="true" /></Link>
        </div>
        <dl className="ownership-list">{['requirements', 'data', 'operations'].map(key => (
          <div key={key} className="scroll-reveal"><dt>{t('impact.' + key + '.title')}</dt><dd>{t('impact.' + key + '.description')}</dd></div>
        ))}</dl>
      </div>
    </section>
  );
};
