import { createContext, useContext } from "solid-js"
import type { UseTooltipReturn } from "./use-tooltip.js"

export const TooltipProvider = /* @__PURE__ */ createContext<UseTooltipReturn>()

export const useTooltipContext = (): UseTooltipReturn => useContext(TooltipProvider)
