import type * as carousel from "@zag-js/carousel"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselItemProps<As extends ValidComponent = "div"> = PolymorphicProps<As, carousel.ItemProps>

/** The slide at `index`, hidden from assistive technology while it is out of view */
export function CarouselItem<As extends ValidComponent = "div">(props: CarouselItemProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ["index", "snapAlign"])
  const api = useCarouselContext()
  return render(
    "div",
    mergeProps(() => api().getItemProps(itemProps), localProps),
  )
}
