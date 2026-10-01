import { createContext, useContext } from "solid-js"
import type { UseToggleGroupReturn } from "./use-toggle-group.js"

export const ToggleGroupProvider = /* @__PURE__ */ createContext<UseToggleGroupReturn>()

export const useToggleGroupContext = (): UseToggleGroupReturn => useContext(ToggleGroupProvider)
