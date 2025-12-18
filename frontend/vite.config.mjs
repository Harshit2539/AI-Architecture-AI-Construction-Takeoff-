import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";
import compression from "vite-plugin-compression";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },

  plugins: [
    tsconfigPaths(),
    react(),
    tagger(),

    // Serve .gz and .br files correctly for WebViewer workers
    compression({ algorithm: "gzip", ext: ".gz" }),
    compression({ algorithm: "brotliCompress", ext: ".br" }),

    // Copy /public/lib to /build/lib exactly as WebViewer expects
    viteStaticCopy({
      targets: [
        {
          src: "public/lib",
          dest: "", // copies to build/lib/
        },
      ],
    }),
  ],

  server: {
    port: 4028,
    host: "0.0.0.0",
    strictPort: true,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new'],

    // CRITICAL headers for PDFNet, WASM, and annotations
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
      "Access-Control-Allow-Origin": "*",
    }
  }
});
