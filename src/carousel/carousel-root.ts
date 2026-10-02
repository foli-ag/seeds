import * as carousel from "@zag-js/carousel"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useCarousel, type UseCarouselProps } from "./use-carousel.js"
import { CarouselProvider } from "./use-carousel-context.js"

export type CarouselRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseCarouselProps>

export function CarouselRoot<As extends ValidComponent = "div">(props: CarouselRootProps<As>): Element {
  const [carouselProps, localProps] = splitProps(props, carousel.props)
  const api = useCarousel(carouselProps)
  return provide(CarouselProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
