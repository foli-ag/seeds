import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export interface SliderMarkerGroupProps extends PartProps<"div"> {}

export function SliderMarkerGroup(props: SliderMarkerGroupProps): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getMarkerGroupProps(), props),
  )
}
