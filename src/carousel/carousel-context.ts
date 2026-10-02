import { untrack, type Element } from "solid-js"
import type { UseCarouselReturn } from "./use-carousel.js"
import { useCarouselContext } from "./use-carousel-context.js"

export interface CarouselContextProps {
  children: (api: UseCarouselReturn) => Element
}

/** Renders `children` with the carousel's API */
export function CarouselContext(props: CarouselContextProps): Element {
  return untrack(() => props.children(useCarouselContext()))
}
