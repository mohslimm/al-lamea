import { memo } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Badge } from './Badge';
import type { Brand } from '@/types';
import { useTranslation } from 'react-i18next';

export interface BrandModalProps {
  brand: Brand | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BrandModal = memo(({ brand, isOpen, onClose }: BrandModalProps) => {
  const { t } = useTranslation();

  if (!isOpen || !brand) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />

      {/* Modal Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] rounded-xl p-8 md:p-12 shadow-2xl overflow-hidden"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto text-[var(--text-muted)] hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col items-center text-center space-y-6">
          <div className="h-24 w-48 flex items-center justify-center bg-[var(--bg-elevated)] rounded-lg border border-[var(--border-subtle)] p-4">
            {brand.logoUrl ? (
              <img src={brand.logoUrl} alt={brand.name} width="400" height="400" className="w-full h-full object-contain p-8" loading="lazy" decoding="async" />
            ) : (
              <span className="font-display text-2xl text-[var(--text-primary)]">{brand.name}</span>
            )}
          </div>

          <Badge variant="gold">{t('brands.exclusive')}</Badge>

          <p className="text-[var(--text-primary)] text-lg md:text-xl leading-relaxed">
            {brand.description}
          </p>

          {brand.productsInLibya && (
            <div className="w-full pt-6 border-t border-[var(--border-subtle)]">
              <p className="text-[var(--text-muted)] text-sm">
                {brand.productsInLibya}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
});

BrandModal.displayName = 'BrandModal';
