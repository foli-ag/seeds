import { createContext, useContext } from "solid-js"
import type { UseAngleSliderReturn } from "./use-angle-slider.js"

export const AngleSliderProvider = /* @__PURE__ */ createContext<UseAngleSliderReturn>()

export const useAngleSliderContext = (): UseAngleSliderReturn => useContext(AngleSliderProvider)
