import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderValueTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** Shows `children`, or the value with thumbs separated by commas */
export function SliderValueText<As extends ValidComponent = "span">(props: SliderValueTextProps<As>): Element {
  const api = useSliderContext()
  return render(
    "span",
    mergeProps(() => api().getValueTextProps(), props, {
      get children() {
        return props.children || api().value.join(",")
      },
    }),
  )
}
