import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export interface SliderValueTextProps extends PartProps<"span"> {}

/** Shows `children`, or the value with thumbs separated by commas */
export function SliderValueText(props: SliderValueTextProps): Element {
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
