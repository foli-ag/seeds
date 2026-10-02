import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRatingGroupContext } from "./use-rating-group-context.js"

export type RatingGroupHiddenInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** Carries the value into forms */
export function RatingGroupHiddenInput<As extends ValidComponent = "input">(
  props: RatingGroupHiddenInputProps<As>,
): Element {
  const api = useRatingGroupContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(), props),
  )
}
