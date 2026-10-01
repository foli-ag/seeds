import { createContext, useContext } from "solid-js"
import type { UseCollapsibleReturn } from "./use-collapsible.js"

export const CollapsibleProvider = /* @__PURE__ */ createContext<UseCollapsibleReturn>()

export const useCollapsibleContext = (): UseCollapsibleReturn => useContext(CollapsibleProvider)
