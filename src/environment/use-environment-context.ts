import { createContext, useContext } from "solid-js"

/** Where the machines inside an `EnvironmentProvider` look up their elements */
export interface EnvironmentContext {
  /** The document or shadow root the app renders in */
  getRootNode(): RootNode
  /** The document of the root node */
  getDocument(): Document
  /** The window of the root node */
  getWindow(): Window & typeof globalThis
}

export type RootNode = ShadowRoot | Document | Node

/** The environment of the nearest `EnvironmentProvider`. It never changes, and its getters read the DOM when called. */
export function useEnvironmentContext(): EnvironmentContext {
  return useContext(EnvironmentContextProvider)
}

// Outside a provider, machines look up their elements in the page's document, as zag does without `getRootNode`
export const EnvironmentContextProvider = /* @__PURE__ */ createContext<EnvironmentContext>({
  getRootNode: () => document,
  getDocument: () => document,
  getWindow: () => window,
})
