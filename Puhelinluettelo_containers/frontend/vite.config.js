import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      host: "localhost",
      protocol: "ws",
      port: 5173,
    },
    host: true,
    port: 5173,
    strictPort: true,
    allowedHosts: [".localhost", "frontend"],
    proxy: {
      "/api": "http://backend:3001",
    },
    watch: {
      usePolling: true,
    },
  },
});
