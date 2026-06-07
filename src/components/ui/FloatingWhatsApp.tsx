import { MessageCircle } from 'lucide-react';
import { CONTACT_WHATSAPP } from '../../lib/constants';

export const FloatingWhatsApp = () => {
  return (
    <a
      href={`https://wa.me/${CONTACT_WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="absolute right-full mr-4 bg-white text-gray-900 px-3 py-1 rounded shadow-sm text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Need assistance?
      </span>
    </a>
  );
};
