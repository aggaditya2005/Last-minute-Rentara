import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import history from "connect-history-api-fallback";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "single-page-app",
      configureServer(server) {
        server.middlewares.use(
          history({
            index: "/index.html",
            htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
            disableDotRule: false,
            verbose: false,
          })
        );
      },
    },
  ],

  server: {
    port: 3000,
    host: true,
  },
});
