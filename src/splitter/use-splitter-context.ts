import { createContext, useContext } from "solid-js"
import type { UseSplitterReturn } from "./use-splitter.js"

export const SplitterProvider = /* @__PURE__ */ createContext<UseSplitterReturn>()

export const useSplitterContext = (): UseSplitterReturn => useContext(SplitterProvider)
