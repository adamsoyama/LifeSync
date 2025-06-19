import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/lifesync/" : "/", // Change to your GitHub repo name
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        authentication: resolve(__dirname, "src/pages/authentication.html"),
        dashboard: resolve(__dirname, "src/pages/dashboard.html"),
        mental: resolve(__dirname, "src/pages/mental_health.html"),
        finance: resolve(__dirname, "src/pages/finance.html"),
        entertainment: resolve(__dirname, "src/pages/entertainment.html"),
        community: resolve(__dirname, "src/pages/community.html"),
        career: resolve(__dirname, "src/pages/career.html"),
      },
      output: {
        format: "esm", // Ensures ES Module compatibility
      },
    },
  },
});
// This configuration sets up Vite to build a multi-page application
