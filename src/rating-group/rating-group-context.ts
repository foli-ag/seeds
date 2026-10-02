import { untrack, type Element } from "solid-js"
import type { UseRatingGroupReturn } from "./use-rating-group.js"
import { useRatingGroupContext } from "./use-rating-group-context.js"

export interface RatingGroupContextProps {
  children: (api: UseRatingGroupReturn) => Element
}

/** Renders `children` with the rating group's API */
export function RatingGroupContext(props: RatingGroupContextProps): Element {
  return untrack(() => props.children(useRatingGroupContext()))
}
