import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the triggers and the indicators */
export function CarouselControl<As extends ValidComponent = "div">(props: CarouselControlProps<As>): Element {
  const api = useCarouselContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
