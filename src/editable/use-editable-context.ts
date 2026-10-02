import { createContext, useContext } from "solid-js"
import type { UseEditableReturn } from "./use-editable.js"

export const EditableProvider = /* @__PURE__ */ createContext<UseEditableReturn>()

export const useEditableContext = (): UseEditableReturn => useContext(EditableProvider)
