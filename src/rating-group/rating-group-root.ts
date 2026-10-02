import * as ratingGroup from "@zag-js/rating-group"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useRatingGroup, type UseRatingGroupProps } from "./use-rating-group.js"
import { RatingGroupProvider } from "./use-rating-group-context.js"

export type RatingGroupRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseRatingGroupProps>

export function RatingGroupRoot<As extends ValidComponent = "div">(props: RatingGroupRootProps<As>): Element {
  const [ratingGroupProps, localProps] = splitProps(props, ratingGroup.props)
  const api = useRatingGroup(ratingGroupProps)
  return provide(RatingGroupProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
