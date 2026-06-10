import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Home, Info, Box, Star, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BottomNav = memo(() => {
  const { t } = useTranslation();

  const tabs = [
    { id: 'home', icon: Home, label: t('nav.home'), href: '#home' },
    { id: 'about', icon: Info, label: t('nav.about'), href: '#about' },
    { id: 'products', icon: Box, label: t('nav.products'), href: '#products' },
    { id: 'brands', icon: Star, label: t('nav.brands'), href: '#brands' },
    { id: 'contact', icon: Mail, label: t('nav.contact'), href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.5 }}
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[rgba(11,25,41,0.85)] backdrop-blur-[20px] border-t border-[var(--border-subtle)] pb-[env(safe-area-inset-bottom)]"
    >
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.a
              key={tab.id}
              href={tab.href}
              whileTap={{ scale: 0.95, opacity: 0.85 }}
              className="flex flex-col items-center justify-center w-full h-full min-h-[44px] min-w-[44px] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium tracking-wide">
                {tab.label}
              </span>
            </motion.a>
          );
        })}
      </div>
    </motion.nav>
  );
});

BottomNav.displayName = 'BottomNav';
