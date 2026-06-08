import { useState, useEffect, lazy, Suspense } from "react";
import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import { Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { MotionConfig, AnimatePresence } from "framer-motion";

import Layout from "./layout/Layout";
import { HybridLoader } from "./components/ui/HybridLoader";

const HomePage = lazy(() =>
  import("./pages/HomePage").then((m) => ({ default: m.HomePage }))
);

const LegalPage = lazy<ComponentType<{ type: "privacy" | "terms" | "cookies" | "legal" }>>(() =>
  import("./pages/LegalPage").then((m) => ({ default: m.LegalPage }))
);

const PartnershipPage = lazy(() =>
  import("./pages/PartnershipPage").then((m) => ({ default: m.PartnershipPage }))
);

function App() {
  const { i18n } = useTranslation();
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {!isAppReady && (
          <HybridLoader key="hybrid-loader" onComplete={() => setIsAppReady(true)} />
        )}
      </AnimatePresence>

      <Suspense fallback={<div className="min-h-screen bg-[var(--bg-void)]"></div>}>

        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
            <Route path="/terms-conditions" element={<LegalPage type="terms" />} />
            <Route path="/cookie-policy" element={<LegalPage type="cookies" />} />
            <Route path="/legal-notice" element={<LegalPage type="legal" />} />
            <Route path="/partnership" element={<PartnershipPage />} />
          </Route>
        </Routes>

      </Suspense>

      <Analytics />
    </MotionConfig>
  );
}

export default App;