import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
export const Footer: React.FC = () => {
  const { t } = useI18n();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    document.getElementById('main-content')?.focus({ preventScroll: true });
  };
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <p className="footer-name">Murilo Dias.</p>
          <button type="button" onClick={scrollToTop} className="icon-control"><span>{t('footer.backToTop')}</span><ArrowUp aria-hidden="true" /></button>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Murilo Dias. {t('footer.tagline')}</p>
          <div className="footer-socials">
            <a href="https://github.com/self1027" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/murilo-dias-dev/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="mailto:diasmurilo02@gmail.com">Email</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
