import { createContext, useContext } from "solid-js"
import type { UseRadioGroupReturn } from "./use-radio-group.js"

export const RadioGroupProvider = /* @__PURE__ */ createContext<UseRadioGroupReturn>()

export const useRadioGroupContext = (): UseRadioGroupReturn => useContext(RadioGroupProvider)
