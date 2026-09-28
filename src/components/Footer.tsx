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
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-border/60">
          {/* Left: Candidate & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded border border-border flex items-center justify-center bg-surface-muted text-accent font-bold">
              M
            </div>
            <div>
              <p className="font-semibold text-text">Murilo Dias</p>
              <p className="text-[11px] text-text-subtle">{t('footer.tagline')}</p>
            </div>
          </div>

          {/* Center: Tech stack detail */}
          <div className="text-center md:text-left text-text-subtle text-[11px]">
            <span>{t('footer.techStack')}</span>
          </div>

          {/* Right: Back to top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-border bg-surface-subtle hover:border-accent hover:text-text transition-colors"
            aria-label={t('footer.backToTop')}
          >
            <span>{t('footer.backToTop')}</span>
            <ArrowUp className="w-3.5 h-3.5 text-accent" />
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
