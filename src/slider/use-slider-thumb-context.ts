import type { ThumbProps } from "@zag-js/slider"
import { createContext, useContext } from "solid-js"

/** The props of the thumb around the caller, which its parts pass back to the slider */
export const SliderThumbPropsProvider = /* @__PURE__ */ createContext<ThumbProps>()

export const useSliderThumbPropsContext = (): ThumbProps => useContext(SliderThumbPropsProvider)
