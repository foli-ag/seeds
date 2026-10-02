import { createContext, useContext } from "solid-js"
import type { UseCarouselReturn } from "./use-carousel.js"

export const CarouselProvider = /* @__PURE__ */ createContext<UseCarouselReturn>()

export const useCarouselContext = (): UseCarouselReturn => useContext(CarouselProvider)
