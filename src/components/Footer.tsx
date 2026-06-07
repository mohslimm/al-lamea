import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

export const Footer = memo(() => {
  const { t } = useTranslation();

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="text-center md:text-left rtl:md:text-right mb-6 md:mb-0 flex flex-col items-center md:items-start rtl:md:items-end">
            <img src="/logo.png" alt="AL LAMIAA / اللامع" className="h-20 w-auto object-contain mb-6" />
            <p className="text-[var(--text-muted)] text-sm">
              Part of AL TARIQ AL LAMIAA GROUP
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" className="text-[var(--text-muted)] hover:text-[var(--gold)] text-sm transition-colors">{t('nav.about')}</a>
            <a href="#products" className="text-[var(--text-muted)] hover:text-[var(--gold)] text-sm transition-colors">{t('nav.products')}</a>
            <a href="#brands" className="text-[var(--text-muted)] hover:text-[var(--gold)] text-sm transition-colors">{t('nav.brands')}</a>
            <a href="#contact" className="text-[var(--text-muted)] hover:text-[var(--gold)] text-sm transition-colors">{t('nav.contact')}</a>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-[var(--text-muted)] text-xs mb-4 md:mb-0">
            © {new Date().getFullYear()} AL LAMIAA — AL TARIQ AL LAMIAA GROUP
          </p>
          
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageToggle />
            {/* Add Social Icons here if needed */}
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
