import { useTranslation } from 'react-i18next';
import { CONTACT_WHATSAPP } from '../../lib/constants';

export const FloatingWhatsApp = () => {
  const { t } = useTranslation();
  return (
    <a
      href={`https://wa.me/${CONTACT_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 hover:scale-110 transition-transform duration-300 flex items-center justify-center group drop-shadow-xl"
      aria-label="Chat on WhatsApp"
    >
      <img src="/whatsapp.png?v=6" alt="WhatsApp" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
      <span className="absolute right-full mr-4 bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-3 py-1.5 rounded shadow-xl text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        {t('common.needAssistance', 'Need assistance?')}
      </span>
    </a>
  );
};
