import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./tests/setup.ts"],

    include: [
      "tests/**/*.test.ts",
      "tests/**/*.test.tsx",
    ],

    exclude: [
      "node_modules/**",
      "e2e/**",
      "tests/auth.test.ts",
    ],
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
    },
  },
});