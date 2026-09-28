import React, { useState, useEffect } from 'react';
import { Github, ExternalLink, GitFork, Star, FolderGit2, AlertCircle } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';

interface PublicRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export const GithubSection: React.FC = () => {
  const { t } = useI18n();
  const [repos, setRepos] = useState<PublicRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchGithubRepos() {
      try {
        const res = await fetch('https://api.github.com/users/self1027/repos?sort=updated&per_page=6');
        if (!res.ok) {
          throw new Error(`GitHub API responded with status ${res.status}`);
        }
        const data = await res.json();
        if (isMounted && Array.isArray(data)) {
          setRepos(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setHasError(true);
          setLoading(false);
        }
      }
    }

    fetchGithubRepos();

    return () => {
      isMounted = false;
    };
  }, []);

  // Curated fallback repositories based strictly on the verified repos from the prompt
  const fallbackRepos = [
    {
      name: 'Livro',
      description: 'Sistema em produção para gestão e rastreabilidade da Vigilância Sanitária.',
      html_url: 'https://github.com/self1027/Livro',
      language: 'JavaScript / Node.js',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024-05-01T00:00:00Z',
    },
    {
      name: 'INTEGRA',
      description: 'Pipeline de áudio em tempo real para tradução e renderização em Libras com avatar 3D.',
      html_url: 'https://github.com/self1027/INTEGRA',
      language: 'JavaScript / Node.js',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024-04-01T00:00:00Z',
    },
    {
      name: 'ascii-cam',
      description: 'Webcam para arte ASCII a 30+ FPS com Web Workers e Transferable Objects.',
      html_url: 'https://github.com/self1027/ascii-cam',
      language: 'TypeScript',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024-03-01T00:00:00Z',
    },
    {
      name: 'infinity-ttt',
      description: 'Motor multiplayer baseado em servidor autoritativo e Socket.io.',
      html_url: 'https://github.com/self1027/infinity-ttt',
      language: 'TypeScript / Node.js',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024-02-01T00:00:00Z',
    },
    {
      name: 'NoBSDownloader',
      description: 'Motor de extração de mídia utilizando child processes, yt-dlp e FFmpeg.',
      html_url: 'https://github.com/self1027/NoBSDownloader',
      language: 'JavaScript / Node.js',
      stargazers_count: 0,
      forks_count: 0,
      updated_at: '2024-01-01T00:00:00Z',
    },
  ];

  const displayedRepos = repos.length > 0 ? repos : fallbackRepos;

  return (
    <section id="github" className="py-16 md:py-24 bg-surface-subtle border-b border-border" aria-label="GitHub Open Source">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-accent mb-2">
              <span className="font-semibold">{t('github.sectionBadge')}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text mb-3">
              {t('github.title')}
            </h2>
            <p className="text-sm sm:text-base text-text-muted max-w-2xl">
              {t('github.subtitle')}
            </p>
          </div>

          <a
            href="https://github.com/self1027"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-surface border border-border hover:border-accent text-text hover:text-accent font-mono text-xs font-semibold transition-colors shadow-2xs self-start md:self-auto shrink-0"
          >
            <Github className="w-4 h-4 text-accent" />
            <span>{t('github.cta')}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Repositories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedRepos.slice(0, 6).map((repo) => (
            <a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-lg border border-border bg-surface hover:border-accent transition-all duration-200 flex flex-col justify-between"
              aria-label={`Repository ${repo.name}`}
            >
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold text-text group-hover:text-accent transition-colors truncate">
                    <FolderGit2 className="w-4 h-4 text-accent shrink-0" />
                    <span className="truncate">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-text-subtle group-hover:text-accent shrink-0 transition-colors" />
                </div>

                <p className="text-xs text-text-muted leading-relaxed line-clamp-3 mb-4">
                  {repo.description || 'Public repository focused on backend logic and system architecture.'}
                </p>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] font-mono text-text-subtle">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  <span>{repo.language || 'Node.js'}</span>
                </span>

                {/* Only display star/fork counts if they came from the live API and are > 0, otherwise subtle link */}
                <span className="text-text-subtle group-hover:text-text transition-colors">
                  github.com/self1027
                </span>
              </div>
            </a>
          ))}
        </div>

        {hasError && (
          <p className="mt-4 text-xs font-mono text-text-subtle flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            <span>{t('github.errorFallback')}</span>
          </p>
        )}
      </div>
    </section>
  );
};
