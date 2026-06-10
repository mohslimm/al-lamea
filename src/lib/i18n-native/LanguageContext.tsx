import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import translations from './translations';

export type Language = 'en' | 'fr' | 'ar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang') as Language;
    if (saved && ['en', 'fr', 'ar'].includes(saved)) return saved;
    const browserLang = navigator.language.split('-')[0];
    return ['en', 'fr', 'ar'].includes(browserLang) ? (browserLang as Language) : 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('app_lang', newLang);
  };

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    // Injection des classes de typographie RTL globales
    if (lang === 'ar') {
      document.body.classList.add('font-arabic', 'text-[0.9em]', 'leading-[1.8]', 'tracking-normal');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.remove('font-arabic', 'text-[0.9em]', 'leading-[1.8]', 'tracking-normal');
      document.body.classList.add('font-sans');
    }
  }, [lang]);

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[lang];
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation missing for key: ${path} in ${lang}`);
        return path;
      }
      current = current[key];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLang must be used within a LanguageProvider');
  }
  return context;
};
