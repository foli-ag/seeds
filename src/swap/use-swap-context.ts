import { createContext, useContext } from "solid-js"
import type { UseSwapReturn } from "./use-swap.js"

export const SwapProvider = /* @__PURE__ */ createContext<UseSwapReturn>()

export const useSwapContext = (): UseSwapReturn => useContext(SwapProvider)
