import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselGroupProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The track that holds the items and scrolls from page to page, snapping to each */
export function CarouselGroup<As extends ValidComponent = "div">(props: CarouselGroupProps<As>): Element {
  const api = useCarouselContext()
  return render(
    "div",
    mergeProps(() => api().getItemGroupProps(), props),
  )
}
