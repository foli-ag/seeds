import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCarouselContext } from "./use-carousel-context.js"

export type CarouselProgressTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** Shows `children`, or the current page out of the total through `translations.progressText` ("1 / 3" by default) */
export function CarouselProgressText<As extends ValidComponent = "span">(
  props: CarouselProgressTextProps<As>,
): Element {
  const api = useCarouselContext()
  return render(
    "span",
    mergeProps(() => api().getProgressTextProps(), props, {
      get children() {
        return props.children || api().getProgressText()
      },
    }),
  )
}
