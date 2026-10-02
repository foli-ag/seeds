import { createComponent, Show, type Component, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselAutoplayIndicatorProps<As extends ValidComponent = "span"> = PolymorphicProps<
  As,
  {
    /** Shown instead of `children` while autoplay is stopped */
    fallback?: Element
  }
>

// The overload that takes plain children, which `createComponent` cannot pick on its own
const ShowElement = Show as Component<{ when: boolean; fallback: Element; children: Element }>

/** Shows `children` while autoplay plays, and `fallback` while it is stopped */
export function CarouselAutoplayIndicator<As extends ValidComponent = "span">(
  props: CarouselAutoplayIndicatorProps<As>,
): Element {
  const [indicatorProps, localProps] = splitProps(props, ["fallback"])
  const api = useCarouselContext()
  // zag's anatomy has no autoplay indicator part, so it is named here the way zag names the others
  return render(
    "span",
    mergeProps({ "data-scope": "carousel", "data-part": "autoplay-indicator" }, localProps, {
      get children() {
        return createComponent(ShowElement, {
          get when() {
            return api().isPlaying
          },
          get fallback() {
            return indicatorProps.fallback
          },
          get children() {
            return props.children
          },
        })
      },
    }),
  )
}
