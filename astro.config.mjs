import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://youplala.github.io",
  base: process.env.DEPLOY_BASE || "/",
  output: "static",
  trailingSlash: "always",
  server: { port: 4321 },
  devToolbar: { enabled: false },
});
