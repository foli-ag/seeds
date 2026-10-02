import { registry, type SplitterRegistry, type SplitterRegistryOptions } from "@zag-js/splitter"

export type { HitAreaMargins, SplitterRegistry, SplitterRegistryOptions } from "@zag-js/splitter"

/** Shared through the `registry` prop of several splitters, so that a pointer where their triggers meet drags them all */
export function createSplitterRegistry(options?: SplitterRegistryOptions): SplitterRegistry {
  return registry(options)
}
