import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://longpham28.github.io",
  output: "static",
  build: {
    format: "directory",
  },
});
