import React from 'react';
import { ArrowDown, FileText, Github, Linkedin, Mail, ExternalLink, Terminal } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { Link } from '../router/RouterContext';

export const Hero: React.FC = () => {
  const { language, t } = useI18n();

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden border-b border-border">
      {/* Background technical grid pattern */}
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-60" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main textual column (7 cols) */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status & location metadata */}
            <div className="flex items-center gap-2.5 text-xs font-mono text-text-muted mb-5">
              <span className="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{t('hero.status')}</span>
              </span>
              <span className="text-text-subtle/60" aria-hidden="true">·</span>
              <span className="text-text-muted">{t('hero.env')}</span>
              <span className="text-text-subtle/60" aria-hidden="true">·</span>
              <span className="text-text-subtle">Brazil (UTC-3)</span>
            </div>

            {/* Candidate Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-text leading-tight mb-3">
              Murilo Dias
            </h1>

            {/* Role Header */}
            <h2 className="text-lg sm:text-xl font-medium text-accent mb-4">
              {t('hero.role')}
            </h2>

            {/* Core Description */}
            <p className="text-base sm:text-lg text-text-muted leading-relaxed mb-4 max-w-2xl">
              {t('hero.description')}
            </p>

            {/* Availability note */}
            <p className="text-sm text-text-muted mb-8">
              {t('hero.secondary')}
            </p>

            {/* Primary Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <Link
                to="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-mono text-xs font-semibold tracking-wide transition-all duration-150 shadow-xs focus-visible:ring-2 bg-zinc-900 hover:bg-zinc-800 text-amber-400 border border-zinc-800 dark:bg-amber-400 dark:hover:bg-amber-300 dark:text-zinc-950 dark:border-amber-300"
              >
                <span>{t('hero.ctaProjects')}</span>
                <ArrowDown className="w-4 h-4" />
              </Link>

              <a
                href={language === 'pt-BR' ? '/media/MuriloDias_CV.pdf' : '/media/MuriloDias_Resume.pdf'}
                target="_blank"
                rel="noopener noreferrer"
                download={language === 'pt-BR' ? 'MuriloDias_CV.pdf' : 'MuriloDias_Resume.pdf'}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-border bg-surface text-text hover:border-accent hover:text-accent font-mono text-xs font-medium transition-colors focus-visible:ring-2"
              >
                <FileText className="w-4 h-4 text-accent" />
                <span>{t('hero.ctaResume')}</span>
              </a>
            </div>

            {/* Social / Direct Contacts */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-text-muted pt-3 border-t border-border/60 w-full">
              <a
                href="https://github.com/self1027"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-text transition-colors"
                aria-label="GitHub profile of Murilo Dias"
              >
                <Github className="w-3.5 h-3.5" />
                <span>github/self1027</span>
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href="https://www.linkedin.com/in/murilo-dias-dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-text transition-colors"
                aria-label="LinkedIn profile of Murilo Dias"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>linkedin</span>
              </a>
              <span className="text-border" aria-hidden="true">·</span>
              <a
                href="mailto:diasmurilo02@gmail.com"
                className="inline-flex items-center gap-1.5 hover:text-text transition-colors"
                aria-label="Send email to diasmurilo02@gmail.com"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>email</span>
              </a>
            </div>
          </div>

          {/* Technical code preview (5 cols) */}
          <div className="lg:col-span-5 w-full">
            <div className="rounded-lg border border-code bg-code shadow-md overflow-hidden font-mono text-xs text-code">
              {/* Window bar */}
              <div className="flex items-center justify-between px-3.5 py-2 bg-[#0c0d11] border-b border-code">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-text-subtle">
                  <Terminal className="w-3 h-3 text-accent" />
                  <span>murilo.ts</span>
                </div>
                <span className="text-[10px] text-text-subtle font-mono">TS 5.x</span>
              </div>

              {/* Clean TypeScript type definition */}
              <div className="p-4 space-y-1.5 leading-relaxed overflow-x-auto text-xs">
                <p className="text-text-subtle">// {language === 'pt-BR' ? 'Especificação Técnica' : 'Technical Specification'}</p>
                <p>
                  <span className="text-secondary">interface</span>{' '}
                  <span className="text-accent font-medium">BackendProfile</span> {'{'}
                </p>
                <p className="pl-4">
                  <span className="text-text-muted">specialization:</span>{' '}
                  <span className="text-emerald-400">'Node.js & TypeScript'</span>;
                </p>
                <p className="pl-4">
                  <span className="text-text-muted">architecture:</span>{' '}
                  <span className="text-emerald-400">'APIs · Real-Time · Event-Driven'</span>;
                </p>
                <p className="pl-4">
                  <span className="text-text-muted">databases:</span>{' '}
                  <span className="text-amber-400">['PostgreSQL', 'Redis']</span>;
                </p>
                <p className="pl-4">
                  <span className="text-text-muted">productionReady:</span>{' '}
                  <span className="text-cyan-400">true</span>;
                </p>
                <p>{'};'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
