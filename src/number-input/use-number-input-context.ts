import { createContext, useContext } from "solid-js"
import type { UseNumberInputReturn } from "./use-number-input.js"

export const NumberInputProvider = /* @__PURE__ */ createContext<UseNumberInputReturn>()

export const useNumberInputContext = (): UseNumberInputReturn => useContext(NumberInputProvider)
