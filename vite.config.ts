import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import path from "path";

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "g2-render",
      fileName: (format) => `g2-render.${format}.js`,
    },
    rollupOptions: {
      external: ["@antv/g2"],
      output: {
        globals: {
          "@antv/g2": "G2",
        },
      },
    },
  },
});
