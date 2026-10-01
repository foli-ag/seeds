import { createContext, useContext } from "solid-js"
import type { UseSwitchReturn } from "./use-switch.js"

export const SwitchProvider = /* @__PURE__ */ createContext<UseSwitchReturn>()

export const useSwitchContext = (): UseSwitchReturn => useContext(SwitchProvider)
