import { defineConfig } from "tsup"

// solid-js 2 ships ESM only, so the library does too. Each component directory is an entry, published as a subpath.
export default defineConfig({
  entry: ["src/index.ts", "src/*/index.ts"],
  format: ["esm"],
  target: "es2020",
  dts: true,
  clean: true,
})
