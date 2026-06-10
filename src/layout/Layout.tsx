import { Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";

// Lazy load non-critical visual flairs and interaction-dependent components
const CustomCursor = lazy(() => import("../components/CustomCursor").then(m => ({ default: m.CustomCursor })));
const BackgroundAura = lazy(() => import("../components/BackgroundAura").then(m => ({ default: m.BackgroundAura })));
const FloatingWhatsApp = lazy(() => import("../components/ui/FloatingWhatsApp").then(m => ({ default: m.FloatingWhatsApp })));
const ScrollToTop = lazy(() => import("../components/ui/ScrollToTop").then(m => ({ default: m.ScrollToTop })));

export default function Layout() {
    return (
        <>
            <Suspense fallback={null}>
                <BackgroundAura />
                <CustomCursor />
            </Suspense>

            <Header />
            
            <Suspense fallback={null}>
                <FloatingWhatsApp />
                <ScrollToTop />
            </Suspense>

            <Outlet />

            <Footer />
        </>
    );
}