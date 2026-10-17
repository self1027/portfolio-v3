import React, { useEffect, useRef, useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useI18n } from '../i18n/I18nContext';
import { useTheme } from '../theme/ThemeContext';
import { useRouter, Link } from '../router/RouterContext';
export const Header: React.FC = () => {
  const { language, setLanguage, t } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { path } = useRouter();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && open) { setOpen(false); menuButton.current?.focus(); }
    };
    const onOutside = (event: PointerEvent) => {
      if (header.current && !header.current.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => { if (window.innerWidth > 760) setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onOutside);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onOutside);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);
  const links = ['projects', 'experience', 'skills', 'contact'];
  const destination = (id: string) => path === '/' ? '#' + id : '/#' + id;
  return (
    <header className="site-header" ref={header}>
      <div className="header-inner shell">
        <Link to="/" className="brand" aria-label={t('nav.home')}>
          <span className="brand-symbol" aria-hidden="true">m.</span><span>Murilo Dias</span>
        </Link>
        <nav className="desktop-nav" aria-label={t('nav.main')}>
          {links.map(id => <Link key={id} to={destination(id)}>{t('nav.' + id)}</Link>)}
        </nav>
        <div className="header-controls">
          <button type="button" className="icon-control" onClick={() => setLanguage(language === 'pt-BR' ? 'en-US' : 'pt-BR')}
            aria-label={language === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'} lang={language === 'pt-BR' ? 'en' : 'pt-BR'}>
            {language === 'pt-BR' ? 'EN' : 'PT'}
          </button>
          <button type="button" className="icon-control" onClick={toggleTheme} aria-label={theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}>
            {theme === 'dark' ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
          </button>
          <button type="button" className="icon-control mobile-toggle" ref={menuButton} onClick={() => setOpen(!open)}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={open} aria-controls="mobile-navigation">
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
      {open && <nav id="mobile-navigation" className="mobile-nav" aria-label={t('nav.main')}>
        {links.map(id => <Link key={id} to={destination(id)} onClick={() => setOpen(false)}>{t('nav.' + id)}</Link>)}
        <a href={language === 'pt-BR' ? '/media/MuriloDias_CV.pdf' : '/media/MuriloDias_Resume.pdf'} download>{t('hero.ctaResume')}</a>
      </nav>}
    </header>
  );
};
