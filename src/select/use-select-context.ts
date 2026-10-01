import { createContext, useContext } from "solid-js"
import type { UseSelectReturn } from "./use-select.js"

export const SelectProvider = /* @__PURE__ */ createContext<UseSelectReturn>()

export const useSelectContext = (): UseSelectReturn => useContext(SelectProvider)
