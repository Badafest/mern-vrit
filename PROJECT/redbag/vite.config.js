// https://vitejs.dev/config/
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    ENV: loadEnv("", process.cwd(), ""),
  },
});
