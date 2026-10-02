import { createContext, useContext } from "solid-js"
import type { UseToggleReturn } from "./use-toggle.js"

export const ToggleProvider = /* @__PURE__ */ createContext<UseToggleReturn>()

export const useToggleContext = (): UseToggleReturn => useContext(ToggleProvider)
