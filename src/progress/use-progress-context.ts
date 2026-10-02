import { createContext, useContext } from "solid-js"
import type { UseProgressReturn } from "./use-progress.js"

export const ProgressProvider = /* @__PURE__ */ createContext<UseProgressReturn>()

export const useProgressContext = (): UseProgressReturn => useContext(ProgressProvider)
