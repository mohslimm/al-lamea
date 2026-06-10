import { memo } from 'react';
import { motion } from 'framer-motion';
import { useLang, Language } from './LanguageContext';

export const LanguageSwitcher = memo(() => {
  const { lang, setLang } = useLang();
  const languages: { code: Language; label: string }[] = [
    { code: 'en', label: 'EN' },
    { code: 'fr', label: 'FR' },
    { code: 'ar', label: 'ع' }
  ];

  return (
    <div className="flex bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-full p-1 shadow-sm relative">
      {languages.map((l) => {
        const isActive = lang === l.code;
        return (
          <button
            key={l.code}
            onClick={() => setLang(l.code)}
            className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-300 z-10 
              ${isActive ? 'text-[#1A1200]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'}
            `}
          >
            {isActive && (
              <motion.div
                layoutId="activeLangIndicator"
                className="absolute inset-0 bg-[var(--gold)] rounded-full -z-10 shadow-[0_0_10px_var(--gold-glow)]"
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              />
            )}
            <span className={l.code === 'ar' ? 'font-arabic text-lg leading-none mt-1 inline-block' : ''}>
              {l.label}
            </span>
          </button>
        );
      })}
    </div>
  );
});

LanguageSwitcher.displayName = 'LanguageSwitcher';
