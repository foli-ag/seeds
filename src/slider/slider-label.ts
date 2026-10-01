import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderLabelProps<As extends ValidComponent = "label"> = PartProps<As>

export function SliderLabel<As extends ValidComponent = "label">(props: SliderLabelProps<As>): Element {
  const api = useSliderContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
