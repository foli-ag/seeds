import { createContext, useContext } from "solid-js"
import type { UseRadioGroupReturn } from "./use-radio-group"

export const RadioGroupProvider = createContext<UseRadioGroupReturn>()

export const useRadioGroupContext = (): UseRadioGroupReturn => useContext(RadioGroupProvider)
