import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRatingGroupContext } from "./use-rating-group-context.js"

export type RatingGroupLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

/** Names the rating, and focuses its checked item when clicked */
export function RatingGroupLabel<As extends ValidComponent = "label">(props: RatingGroupLabelProps<As>): Element {
  const api = useRatingGroupContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
