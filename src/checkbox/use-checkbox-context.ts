import { createContext, useContext } from "solid-js"
import type { UseCheckboxReturn } from "./use-checkbox.js"

export const CheckboxProvider = /* @__PURE__ */ createContext<UseCheckboxReturn>()

export const useCheckboxContext = (): UseCheckboxReturn => useContext(CheckboxProvider)
