import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  base: "/lifesync/", // Change to your GitHub repo name
  build: {
    rollupOptions: {
      input: {
        dashboard: resolve(__dirname, "index.html"),
        dashboard: resolve(__dirname, "src/pages/dashboard.html"), // Dashboard main page
        mental: resolve(__dirname, "src/pages/mental-health.html"),
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
