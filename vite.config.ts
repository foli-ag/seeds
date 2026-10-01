import solidPlugin from "@solidjs/vite-plugin"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [solidPlugin()],
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
