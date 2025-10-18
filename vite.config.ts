import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api/guardian": {
        target: "https://content.guardianapis.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/guardian/, ""),
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/config/testConfig.ts', 
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
