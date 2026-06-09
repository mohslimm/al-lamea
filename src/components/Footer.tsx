import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { Mail, Phone } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONE_1, CONTACT_WHATSAPP } from '../lib/constants';

export const Footer = memo(() => {
  const { t, i18n } = useTranslation();
  const logoSrc = i18n.language === 'ar' ? '/logo-ar.png?v=5' : '/logo.png?v=5';

  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-subtle)] pt-16 pb-8">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Contact Details */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-[var(--text-primary)] font-display text-lg mb-4">{t('nav.contact')}</h4>
            <div className="space-y-2 text-[var(--text-muted)] text-sm">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--gold-500)] shrink-0" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-[var(--gold-500)] transition-colors">{CONTACT_EMAIL}</a>
              </p>
              <p className="flex items-center gap-2" dir="ltr">
                <Phone className="w-3.5 h-3.5 text-[var(--gold-500)] shrink-0" />
                <a href={`tel:${CONTACT_PHONE_1.replace(/\s+/g, '')}`} className="hover:text-[var(--gold-500)] transition-colors">{CONTACT_PHONE_1}</a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-[#25D366] shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                <a href={`https://wa.me/${CONTACT_WHATSAPP.replace(/[\s+]/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--gold-500)] transition-colors" dir="ltr">{CONTACT_WHATSAPP}</a>
              </p>
              <p>{t('contact.address')}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-[var(--text-primary)] font-display text-lg mb-4">{t('footer.navigation')}</h4>
            <div className="space-y-2 flex flex-col">
              <a href="/#about" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('nav.about')}</a>
              <a href="/#products" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('nav.products')}</a>
              <a href="/#brands" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('nav.brands')}</a>
            </div>
          </div>

          {/* Legal Links */}
          <div className="col-span-1 md:col-span-1">
            <h4 className="text-[var(--text-primary)] font-display text-lg mb-4">{t('footer.legal')}</h4>
            <div className="space-y-2 flex flex-col">
              <Link to="/privacy-policy" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('footer.privacy')}</Link>
              <Link to="/terms-conditions" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('footer.terms')}</Link>
              <Link to="/cookie-policy" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('footer.cookies')}</Link>
              <Link to="/legal-notice" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] text-sm transition-colors">{t('footer.legalNotice')}</Link>
            </div>
          </div>

          {/* Brand & Info */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-end text-center md:text-right">
            <img src={logoSrc} alt="AL LAMEA / اللامع" width="200" height="80" className="h-28 w-auto object-contain mb-6" />
            <p className="text-[var(--text-muted)] text-sm mb-4">
              {t('footer.tagline')}
            </p>
          </div>
        </div>

        <div className="border-t border-[var(--border-subtle)] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[var(--text-muted)] text-xs">
            {t('footer.rights', { year: new Date().getFullYear() })}
          </p>
          
          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/share/1Ei8p8tRrZ/?mibextid=wwXIfr" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
            </a>
            <a href="https://www.instagram.com/al.lamea_?igsh=dHoyN3BzdmZnOWMw&utm_source=qr" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
            <a href="https://www.tiktok.com/@al.lamea?_r=1&_t=ZS-972QH8h7CwW" aria-label="TikTok" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--gold-500)] transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.4-2.42 5.92-1.48 1.48-3.53 2.32-5.61 2.36-2.12.04-4.24-.76-5.8-2.16-1.55-1.39-2.52-3.37-2.73-5.46-.22-2.19.29-4.44 1.48-6.26 1.14-1.74 2.87-3.05 4.88-3.54 1.55-.38 3.19-.36 4.71.18v4.13c-.92-.47-2.02-.64-3.04-.44-1.04.2-1.99.78-2.65 1.58-.65.79-1 1.83-.98 2.87.03 1.05.41 2.06 1.09 2.85.67.79 1.63 1.34 2.67 1.52 1.05.19 2.14.04 3.07-.44 1.03-.53 1.81-1.45 2.19-2.53.29-.82.38-1.71.37-2.59-.01-5.68 0-11.36-.01-17.04z"/></svg>
            </a>
          </div>

          <div>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
