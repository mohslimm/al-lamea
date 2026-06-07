import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LanguageToggle = memo(() => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  const toggleLang = () => {
    const newLang = currentLang === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLang}
      className="text-sm font-medium tracking-widest text-[var(--text-primary)] hover:text-[var(--gold)] transition-colors px-2 py-1 uppercase"
      aria-label="Toggle language"
    >
      {currentLang === 'en' ? 'عربي' : 'EN'}
    </motion.button>
  );
});

LanguageToggle.displayName = 'LanguageToggle';
