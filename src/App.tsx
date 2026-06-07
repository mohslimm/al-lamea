import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Routes, Route } from 'react-router-dom';
import { Analytics } from "@vercel/analytics/react";
import { TickerBar } from './components/TickerBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { BackgroundAura } from './components/BackgroundAura';
import { FloatingWhatsApp } from './components/ui/FloatingWhatsApp';
import { HomePage } from './pages/HomePage';
import { LegalPage } from './pages/LegalPage';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isRTL = i18n.language === 'ar';
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      <BackgroundAura />
      <CustomCursor />
      <TickerBar />
      <Header />
      <FloatingWhatsApp />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
        <Route path="/terms-conditions" element={<LegalPage type="terms" />} />
        <Route path="/cookie-policy" element={<LegalPage type="cookies" />} />
        <Route path="/legal-notice" element={<LegalPage type="legal" />} />
      </Routes>

      <Footer />
      <Analytics />
    </>
  );
}

export default App;
