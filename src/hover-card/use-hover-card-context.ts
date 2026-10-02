import { createContext, useContext } from "solid-js"
import type { UseHoverCardReturn } from "./use-hover-card.js"

export const HoverCardProvider = /* @__PURE__ */ createContext<UseHoverCardReturn>()

export const useHoverCardContext = (): UseHoverCardReturn => useContext(HoverCardProvider)
