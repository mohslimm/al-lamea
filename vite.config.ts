import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import sitemap from "vite-plugin-sitemap";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    react(),
    sitemap({
      hostname: "https://al-lamea.vercel.app",
      dynamicRoutes: [
        "/",
        "/privacy-policy",
        "/terms-conditions",
        "/cookie-policy",
        "/legal-notice",
        "/partnership",
      ],
    }),
  ],
  build: {
    // Raise warning threshold slightly (we're splitting anyway)
    chunkSizeWarningLimit: 600,

    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // ── Vendor: React core ──────────────────────────────────────
          if (id.includes("node_modules/react/") ||
              id.includes("node_modules/react-dom/") ||
              id.includes("node_modules/react-router-dom/") ||
              id.includes("node_modules/@remix-run/")) {
            return "vendor-react";
          }

          // ── Vendor: Animation (heavy) ───────────────────────────────
          if (id.includes("node_modules/framer-motion/") ||
              id.includes("node_modules/gsap/")) {
            return "vendor-animation";
          }

          // ── Vendor: Forms & Validation ──────────────────────────────
          if (id.includes("node_modules/react-hook-form/") ||
              id.includes("node_modules/@hookform/") ||
              id.includes("node_modules/zod/")) {
            return "vendor-forms";
          }

          // ── Vendor: i18n ────────────────────────────────────────────
          if (id.includes("node_modules/i18next") ||
              id.includes("node_modules/react-i18next/")) {
            return "vendor-i18n";
          }

          // ── Vendor: everything else ─────────────────────────────────
          if (id.includes("node_modules/")) {
            return "vendor-misc";
          }
        },
      },
    },

    // Minify with oxc (built-in to this Vite version)
    minify: "oxc",
  },

  // Optimize deps pre-bundling
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "framer-motion",
      "gsap",
      "react-i18next",
      "i18next",
    ],
  },
});