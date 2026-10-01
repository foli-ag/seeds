import { createContext, useContext } from "solid-js"
import type { UseDialogReturn } from "./use-dialog.js"

export const DialogProvider = /* @__PURE__ */ createContext<UseDialogReturn>()

export const useDialogContext = (): UseDialogReturn => useContext(DialogProvider)
