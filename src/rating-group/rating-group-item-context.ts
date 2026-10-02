import { untrack, type Element } from "solid-js"
import { useRatingGroupItemContext, type UseRatingGroupItemContext } from "./use-rating-group-item-context.js"

export interface RatingGroupItemContextProps {
  children: (item: UseRatingGroupItemContext) => Element
}

/** Renders `children` with the state of the item around it */
export function RatingGroupItemContext(props: RatingGroupItemContextProps): Element {
  return untrack(() => props.children(useRatingGroupItemContext()))
}
