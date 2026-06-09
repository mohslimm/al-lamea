import { Outlet } from "react-router-dom";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { CustomCursor } from "../components/CustomCursor";
import { BackgroundAura } from "../components/BackgroundAura";
import { FloatingWhatsApp } from "../components/ui/FloatingWhatsApp";
import { ScrollToTop } from "../components/ui/ScrollToTop";

export default function Layout() {
    return (
        <>
            <BackgroundAura />
            <CustomCursor />

            <Header />
            <FloatingWhatsApp />
            <ScrollToTop />

            <Outlet />

            <Footer />
        </>
    );
}