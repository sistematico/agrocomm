import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import * as url from "url";

// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
// const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      "@/": `${path.resolve(__dirname, "src")}/`,
      "~/": `${path.resolve(__dirname, "node_modules")}/`
    },
  },
  plugins: [vue()]
})
