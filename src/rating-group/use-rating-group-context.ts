import { createContext, useContext } from "solid-js"
import type { UseRatingGroupReturn } from "./use-rating-group.js"

export const RatingGroupProvider = /* @__PURE__ */ createContext<UseRatingGroupReturn>()

export const useRatingGroupContext = (): UseRatingGroupReturn => useContext(RatingGroupProvider)
