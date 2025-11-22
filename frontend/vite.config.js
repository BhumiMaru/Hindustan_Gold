import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/erp/frontend",
  resolve: {
    extensions: [".js", ".jsx", ".json"],
  },
});
