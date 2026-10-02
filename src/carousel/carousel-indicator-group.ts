import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselIndicatorGroupProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the indicators, between which the arrow keys, Home and End move the carousel */
export function CarouselIndicatorGroup<As extends ValidComponent = "div">(
  props: CarouselIndicatorGroupProps<As>,
): Element {
  const api = useCarouselContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorGroupProps(), props),
  )
}
