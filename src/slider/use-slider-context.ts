import { createContext, useContext } from "solid-js"
import type { UseSliderReturn } from "./use-slider.js"

export const SliderProvider = /* @__PURE__ */ createContext<UseSliderReturn>()

export const useSliderContext = (): UseSliderReturn => useContext(SliderProvider)
