import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export interface SliderLabelProps extends PartProps<"label"> {}

export function SliderLabel(props: SliderLabelProps): Element {
  const api = useSliderContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
