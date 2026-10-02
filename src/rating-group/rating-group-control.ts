import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRatingGroupContext } from "./use-rating-group-context.js"

export type RatingGroupControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The radio group around the items, which tracks the pointer to highlight them */
export function RatingGroupControl<As extends ValidComponent = "div">(props: RatingGroupControlProps<As>): Element {
  const api = useRatingGroupContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
