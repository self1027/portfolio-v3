import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Language } from '../types';
import ptBR from './pt-BR.json';
import enUS from './en-US.json';

type TranslationTree = typeof ptBR;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (keyPath: string) => any;
  translations: TranslationTree;
}

const translationsMap: Record<Language, TranslationTree> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

const I18nContext = createContext<I18nContextType | null>(null);

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('murilo_portfolio_lang');
      if (saved === 'pt-BR' || saved === 'en-US') {
        return saved;
      }
      if (navigator.language && navigator.language.startsWith('en')) {
        return 'en-US';
      }
    }
    return 'pt-BR';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('murilo_portfolio_lang', lang);
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (keyPath: string): any => {
    const keys = keyPath.split('.');
    let current: any = translationsMap[language] || ptBR;
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to pt-BR if missing
        let fallback: any = ptBR;
        for (const fKey of keys) {
          if (fallback && typeof fallback === 'object' && fKey in fallback) {
            fallback = fallback[fKey];
          } else {
            return keyPath;
          }
        }
        return fallback;
      }
    }
    return current;
  };

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, translations: translationsMap[language] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextType => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
