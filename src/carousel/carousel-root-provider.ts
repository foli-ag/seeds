import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseCarouselReturn } from "./use-carousel.js"
import { CarouselProvider } from "./use-carousel-context.js"

export type CarouselRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  { value: UseCarouselReturn }
>

/** A root for a carousel created with `useCarousel` */
export function CarouselRootProvider<As extends ValidComponent = "div">(props: CarouselRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(CarouselProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
