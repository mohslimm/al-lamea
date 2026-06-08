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
      ],
    }),
  ],
});