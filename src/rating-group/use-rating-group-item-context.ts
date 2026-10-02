import type { ItemState } from "@zag-js/rating-group"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseRatingGroupItemContext = Accessor<ItemState>

export const RatingGroupItemProvider = /* @__PURE__ */ createContext<UseRatingGroupItemContext>()

/** The state of the item around the caller */
export const useRatingGroupItemContext = (): UseRatingGroupItemContext => useContext(RatingGroupItemProvider)
