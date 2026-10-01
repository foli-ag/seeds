import solidPlugin from "@solidjs/vite-plugin"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"
import pkg from "./package.json" with { type: "json" }

export default defineConfig({
  plugins: [solidPlugin()],
  // Vite reloads the page when it finds a dependency to prebundle mid-run, which can fail the test that was running.
  // The cache is always cold in the Nix check, so every dependency is prebundled up front.
  optimizeDeps: {
    include: Object.keys(pkg.dependencies),
  },
  test: {
    globals: true,
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: "./vitest.setup.ts",
    // Positioning, focus trapping and outside clicks need real layout and input, which jsdom lacks
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
      screenshotFailures: false,
    },
  },
  resolve: {
    conditions: ["development", "browser"],
  },
})
