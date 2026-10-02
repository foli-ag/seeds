import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselTriggerAutoplayProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Starts autoplay, or stops it while it plays */
export function CarouselTriggerAutoplay<As extends ValidComponent = "button">(
  props: CarouselTriggerAutoplayProps<As>,
): Element {
  const api = useCarouselContext()
  return render(
    "button",
    mergeProps(() => api().getAutoplayTriggerProps(), props),
  )
}
