import * as ratingGroup from "@zag-js/rating-group"
import { createMemo, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useRatingGroupContext } from "./use-rating-group-context.js"
import { RatingGroupItemProvider } from "./use-rating-group-item-context.js"

export type RatingGroupItemProps<As extends ValidComponent = "span"> = PolymorphicProps<As, ratingGroup.ItemProps>

/** The rating `index`, counted from 1 */
export function RatingGroupItem<As extends ValidComponent = "span">(props: RatingGroupItemProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ratingGroup.itemProps)
  const api = useRatingGroupContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  return provide(RatingGroupItemProvider, itemState, () =>
    render(
      "span",
      mergeProps(() => api().getItemProps(itemProps), localProps),
    ),
  )
}
