import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseRatingGroupReturn } from "./use-rating-group.js"
import { RatingGroupProvider } from "./use-rating-group-context.js"

export type RatingGroupRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseRatingGroupReturn }
>

/** A root for a rating group created with `useRatingGroup` */
export function RatingGroupRootProvider<As extends ValidComponent = "div">(
  props: RatingGroupRootProviderProps<As>,
): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(RatingGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
