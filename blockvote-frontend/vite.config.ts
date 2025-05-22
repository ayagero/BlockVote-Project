import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dfx from "vite-plugin-dfx";

export default defineConfig({
  plugins: [react(), dfx()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      overlay: false
    }
  },
  build: {
    outDir: "dist"
  },
  css: {
    postcss: "./postcss.config.js"
  }
});