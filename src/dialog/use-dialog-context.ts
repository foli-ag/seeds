import { createContext, useContext } from "solid-js"
import type { UseDialogReturn } from "./use-dialog"

export const DialogProvider = createContext<UseDialogReturn>()

export const useDialogContext = (): UseDialogReturn => useContext(DialogProvider)
