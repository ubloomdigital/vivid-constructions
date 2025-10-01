import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "src/main.js",
      output: {
        entryFileNames: "bundle.js",
        assetFileNames: "bundle.css",
      },
    },
    minify: false,
    cssCodeSplit: true,
  },
});
