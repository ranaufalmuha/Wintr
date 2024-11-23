import { fileURLToPath, URL } from 'url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import environment from 'vite-plugin-environment';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export default defineConfig({
  build: {
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis",
      },
    },
  },
  server: {
    port: 4943,
    strictPort: true, // Force the specified port
    host: 'localhost',
    proxy: {
      "/api": {
        target: "http://127.0.0.1:4943",
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
    environment("all", { prefix: "CANISTER_" }),
    environment("all", { prefix: "DFX_" }),
    {
      name: 'configure-response-headers',
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Access-Control-Allow-Origin", "*");
          next();
        });
      },
    }
  ],
  resolve: {
    alias: [
      {
        find: "declarations",
        replacement: fileURLToPath(
          new URL("../declarations", import.meta.url)
        ),
      },
    ],
  },
  define: {
    // Make DFX_NETWORK available
    'process.env.DFX_NETWORK': JSON.stringify(process.env.DFX_NETWORK),
    // Add other environment variables you need
    'process.env.CANISTER_ID_INTERNET_IDENTITY': JSON.stringify(process.env.CANISTER_ID_INTERNET_IDENTITY),
    'process.env.CANISTER_ID_WINTR_BACKEND': JSON.stringify(process.env.CANISTER_ID_WINTR_BACKEND),
  }
});