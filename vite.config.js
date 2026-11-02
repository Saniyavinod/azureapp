import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: { __BUILD_TIME__: JSON.stringify(new Date().toISOString()) },
  server: {
    port: 5173,
    // Local dev: forward /api calls to the Functions host (func start) on 7071
    proxy: { "/api": "http://localhost:7071" },
  },
});
