import type * as carousel from "@zag-js/carousel"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselIndicatorProps<As extends ValidComponent = "button"> = PolymorphicProps<As, carousel.IndicatorProps>

/** Scrolls to the page at `index`, and is marked `data-current` while that page is shown */
export function CarouselIndicator<As extends ValidComponent = "button">(props: CarouselIndicatorProps<As>): Element {
  const [indicatorProps, localProps] = splitProps(props, ["index", "readOnly"])
  const api = useCarouselContext()
  return render(
    "button",
    mergeProps(() => api().getIndicatorProps(indicatorProps), localProps),
  )
}
