import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "#model": path.resolve(__dirname, "./src/model"),
      "#state": path.resolve(__dirname, "./src/state"),
      "#structure": path.resolve(__dirname, "./src/structure"),
      "#components": path.resolve(__dirname, "./src/components"),
      "#hooks": path.resolve(__dirname, "./src/hooks"),
      "#ui": path.resolve(__dirname, "./src/ui")
    }
  }
});
