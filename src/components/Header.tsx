import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/Button';
import { LanguageToggle } from './LanguageToggle';

export const Header = memo(() => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.home'), href: '/#home' },
    { label: t('nav.about'), href: '/#about' },
    { label: t('nav.products'), href: '/#products' },
    { label: t('nav.brands'), href: '/#brands' },
    { label: t('nav.production'), href: '/#production' },
    { label: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        className={cn(
          "fixed top-[36px] left-0 right-0 z-40 transition-all duration-300",
          isScrolled ? "bg-[rgba(11,25,41,0.85)] backdrop-blur-lg border-b border-[var(--border-subtle)] py-4 shadow-lg" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/#home" className="block transition-transform hover:scale-105 duration-300">
              <img src="/logo.png" alt="AL LAMEA / اللامع" width="200" height="80" className="h-16 md:h-20 w-auto object-contain" />
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-[var(--text-primary)] hover:text-[var(--gold-light)] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            <LanguageToggle />
            <a href="/#distributor">
              <Button variant="ghost" className="h-10 px-5 text-sm">
                {t('common.becomeDistributor')}
              </Button>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[var(--text-primary)]"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[var(--bg-void)] bg-opacity-95 backdrop-blur-xl flex flex-col pt-[36px]"
          >
            <div className="flex justify-between items-center p-6 border-b border-[var(--border-subtle)]">
              <img src="/logo.png" alt="AL LAMEA" width="150" height="48" className="h-12 w-auto object-contain" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-[var(--text-primary)]">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <nav className="flex flex-col items-center justify-center flex-1 space-y-8">
              {navLinks.map((link) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display text-[var(--text-primary)]"
                >
                  {link.label}
                </motion.a>
              ))}
              
              <div className="pt-8 flex flex-col items-center space-y-6">
                <LanguageToggle />
                <a href="/#distributor" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="ghost">{t('common.becomeDistributor')}</Button>
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = 'Header';
