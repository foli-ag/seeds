import { createContext, useContext } from "solid-js"
import type { UseComboboxReturn } from "./use-combobox.js"

export const ComboboxProvider = /* @__PURE__ */ createContext<UseComboboxReturn>()

export const useComboboxContext = (): UseComboboxReturn => useContext(ComboboxProvider)
