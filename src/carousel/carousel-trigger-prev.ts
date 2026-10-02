import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselTriggerPrevProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Scrolls to the previous page, and is disabled on the first one unless the carousel loops */
export function CarouselTriggerPrev<As extends ValidComponent = "button">(
  props: CarouselTriggerPrevProps<As>,
): Element {
  const api = useCarouselContext()
  return render(
    "button",
    mergeProps(() => api().getPrevTriggerProps(), props),
  )
}
