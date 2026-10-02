import { createContext, useContext, type Accessor } from "solid-js"

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

/** The environment of the nearest `EnvironmentProvider`, whose getters read the DOM when called */
export function useEnvironmentContext(): Accessor<EnvironmentContext> {
  return useContext(EnvironmentContextProvider)
}

// Outside a provider, machines look up their elements in the page's document, as zag does without `getRootNode`
export const EnvironmentContextProvider = /* @__PURE__ */ createContext<Accessor<EnvironmentContext>>(() => ({
  getRootNode: () => document,
  getDocument: () => document,
  getWindow: () => window,
}))
