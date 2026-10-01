import { createContext, useContext } from "solid-js"
import type { UseStepsReturn } from "./use-steps.js"

export const StepsProvider = /* @__PURE__ */ createContext<UseStepsReturn>()

export const useStepsContext = (): UseStepsReturn => useContext(StepsProvider)
