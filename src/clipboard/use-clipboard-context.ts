import { createContext, useContext } from "solid-js"
import type { UseClipboardReturn } from "./use-clipboard.js"

export const ClipboardProvider = /* @__PURE__ */ createContext<UseClipboardReturn>()

export const useClipboardContext = (): UseClipboardReturn => useContext(ClipboardProvider)
