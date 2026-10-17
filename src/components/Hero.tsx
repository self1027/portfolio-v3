import React from 'react';
import { ArrowDown, Download, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';
export const Hero: React.FC = () => {
  const { language, t } = useI18n();
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <h1 id="hero-title" className="hero-heading reveal">Murilo Dias.</h1>
      <p className="hero-role reveal" style={{ animationDelay: '70ms' }}>{t('hero.role')}</p>
      <div className="hero-bottom">
        <div className="reveal" style={{ animationDelay: '140ms' }}>
          <p className="hero-copy">{t('hero.description')}</p>
          <p className="hero-availability">{t('hero.secondary')}</p>
        </div>
        <div className="hero-actions reveal" style={{ animationDelay: '210ms' }}>
          <Link to="#projects" className="action">{t('hero.ctaProjects')}<ArrowDown aria-hidden="true" /></Link>
          <a href={language === 'pt-BR' ? '/media/MuriloDias_CV.pdf' : '/media/MuriloDias_Resume.pdf'} download className="text-link">
            <Download aria-hidden="true" />{t('hero.ctaResume')}
          </a>
        </div>
      </div>
      <div className="hero-proof reveal" style={{ animationDelay: '280ms' }}>
        <Link to="/projects/livro">{t('hero.proof')} <ArrowUpRight aria-hidden="true" className="inline w-4 h-4" /></Link>
        <span>{t('hero.location')}</span>
      </div>
    </section>
  );
};
