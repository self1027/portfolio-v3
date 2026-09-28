import React from 'react';
import { Server, Zap, Radio, GitBranch } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

export const ImpactHighlights: React.FC = () => {
  const { language, t } = useI18n();

  const impactItems = [
    {
      icon: Server,
      title: language === 'pt-BR' ? 'Setor Público em Produção' : 'Public Sector in Production',
      desc: language === 'pt-BR'
        ? 'Sistema em produção utilizado por órgão público'
        : 'Production system used by a public-sector organization',
      meta: 'Vigilância Sanitária',
    },
    {
      icon: Zap,
      title: language === 'pt-BR' ? 'Otimização de Consultas' : 'Query Optimization',
      desc: language === 'pt-BR'
        ? 'Consultas reduzidas de minutos para segundos'
        : 'Query time reduced from minutes to seconds',
      meta: '~5 min → ~10s',
    },
    {
      icon: Radio,
      title: language === 'pt-BR' ? 'Processamento Contínuo' : 'Continuous Streaming',
      desc: language === 'pt-BR'
        ? 'Processamento em tempo real com WebSocket e streaming'
        : 'Real-time processing with WebSocket and streaming',
      meta: 'Low-latency streams',
    },
    {
      icon: GitBranch,
      title: language === 'pt-BR' ? 'Arquitetura de Eventos' : 'Event Architecture',
      desc: language === 'pt-BR'
        ? 'Arquitetura orientada a eventos'
        : 'Event-driven architecture',
      meta: 'Decoupled / Authoritative',
    },
  ];

  return (
    <section className="py-12 bg-surface-subtle border-b border-border" aria-label="Technical Highlights">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-accent font-semibold">{t('impact.badge')}</span>
            <h2 className="text-sm sm:text-base font-mono font-bold tracking-tight text-text">
              {t('impact.title')}
            </h2>
          </div>
          <span className="text-xs font-mono text-text-subtle hidden sm:inline">
            4 / 4 verified capabilities
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {impactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative p-5 rounded-lg border border-border bg-surface transition-all duration-200 hover:border-accent group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded bg-surface-muted text-accent group-hover:bg-accent-subtle transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-mono text-text-subtle group-hover:text-accent transition-colors">
                    {item.meta}
                  </span>
                </div>

                <h3 className="text-sm font-semibold text-text mb-1.5 leading-snug">
                  {item.title}
                </h3>

                <p className="text-xs text-text-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
