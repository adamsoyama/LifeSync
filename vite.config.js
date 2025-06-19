import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    base: isDev ? "/" : "/lifesync/", // 🔁 Use '/' locally, '/lifesync/' when deployed
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
          format: "es",
        },
      },
    },
  };
});
