import { createContext, useContext } from "solid-js"
import type { UseTabsReturn } from "./use-tabs.js"

export const TabsProvider = /* @__PURE__ */ createContext<UseTabsReturn>()

export const useTabsContext = (): UseTabsReturn => useContext(TabsProvider)
