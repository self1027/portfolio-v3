import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Globe, Terminal } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import { useRouter, Link } from '../router/RouterContext';

export const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { label: t('nav.projects'), href: path === '/' ? '#projects' : '/#projects' },
    { label: t('nav.skills'), href: path === '/' ? '#skills' : '/#skills' },
    { label: t('nav.experience'), href: path === '/' ? '#experience' : '/#experience' },
    { label: t('nav.github'), href: path === '/' ? '#github' : '/#github' },
    { label: t('nav.contact'), href: path === '/' ? '#contact' : '/#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b ${
        scrolled
          ? 'bg-bg/90 backdrop-blur-md border-border shadow-xs'
          : 'bg-bg/70 backdrop-blur-xs border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 font-mono group focus-visible:ring-2 rounded"
          aria-label="Murilo Dias — Home"
        >
          <div className="w-8 h-8 rounded border border-border flex items-center justify-center bg-surface group-hover:border-accent transition-colors">
            <span className="font-bold text-accent text-sm">M</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-text group-hover:text-accent transition-colors">
              Murilo Dias
            </span>
            <span className="text-[10px] text-text-subtle font-mono tracking-wider uppercase">
              backend:node
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          <ul className="flex items-center gap-6 text-xs font-mono">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className="text-text-muted hover:text-text transition-colors relative py-1 hover:underline underline-offset-4 decoration-accent decoration-2"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-4 w-px bg-border mx-1" aria-hidden="true" />

          {/* Controls: Language & Theme */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="inline-flex items-center p-0.5 rounded border border-border bg-surface text-xs font-mono">
              <button
                onClick={() => setLanguage('pt-BR')}
                aria-label="Mudar para Português"
                aria-pressed={language === 'pt-BR'}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'pt-BR'
                    ? 'bg-surface-muted text-accent font-semibold shadow-2xs'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en-US')}
                aria-label="Switch to English"
                aria-pressed={language === 'en-US'}
                className={`px-2 py-1 rounded transition-colors ${
                  language === 'en-US'
                    ? 'bg-surface-muted text-accent font-semibold shadow-2xs'
                    : 'text-text-muted hover:text-text'
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
              className="p-2 rounded border border-border bg-surface text-text-muted hover:text-text hover:border-accent transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-accent" />
              ) : (
                <Moon className="w-4 h-4 text-accent" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            className="p-2 rounded border border-border bg-surface text-text-muted"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-accent" />
            ) : (
              <Moon className="w-4 h-4 text-accent" />
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={mobileMenuOpen}
            className="p-2 rounded border border-border bg-surface text-text hover:text-accent transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-b border-border bg-surface px-4 py-6 shadow-xl animate-fadeIn"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <nav className="flex flex-col gap-4 font-mono text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 text-text-muted hover:text-accent transition-colors border-b border-border/40"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-text-subtle">Idioma / Language</span>
              <div className="inline-flex items-center p-0.5 rounded border border-border bg-surface-muted text-xs">
                <button
                  onClick={() => setLanguage('pt-BR')}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === 'pt-BR'
                      ? 'bg-surface text-accent font-semibold'
                      : 'text-text-muted'
                  }`}
                >
                  Português (BR)
                </button>
                <button
                  onClick={() => setLanguage('en-US')}
                  className={`px-3 py-1 rounded transition-colors ${
                    language === 'en-US'
                      ? 'bg-surface text-accent font-semibold'
                      : 'text-text-muted'
                  }`}
                >
                  English (US)
                </button>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
