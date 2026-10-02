import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselTriggerNextProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Scrolls to the next page, and is disabled on the last one unless the carousel loops */
export function CarouselTriggerNext<As extends ValidComponent = "button">(
  props: CarouselTriggerNextProps<As>,
): Element {
  const api = useCarouselContext()
  return render(
    "button",
    mergeProps(() => api().getNextTriggerProps(), props),
  )
}
