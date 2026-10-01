import { createContext, useContext } from "solid-js"
import type { UseCheckboxReturn } from "./use-checkbox"

export const CheckboxProvider = createContext<UseCheckboxReturn>()

export const useCheckboxContext = (): UseCheckboxReturn => useContext(CheckboxProvider)
