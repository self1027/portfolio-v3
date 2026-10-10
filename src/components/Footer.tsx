import React from 'react';
import { ArrowUp, Terminal, Heart } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const Footer: React.FC = () => {
  const { t } = useI18n();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-surface text-text-muted font-mono text-xs border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-border/60">
          {/* Left: Candidate & Tagline */}
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-sm text-text">Murilo Dias</span>
            <span className="text-border" aria-hidden="true">·</span>
            <p className="text-xs text-text-subtle">{t('footer.tagline')}</p>
          </div>

          {/* Right: Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-text-subtle hover:text-text transition-colors cursor-pointer"
            aria-label={t('footer.backToTop')}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-text-subtle">
          <p>© {new Date().getFullYear()} {t('footer.copyright')}</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/self1027"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <span>·</span>
            <a
              href="https://www.linkedin.com/in/murilo-dias-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
            <span>·</span>
            <a
              href="mailto:diasmurilo02@gmail.com"
              className="hover:text-accent transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
