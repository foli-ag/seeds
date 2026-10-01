import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export interface SliderRangeProps extends PartProps<"div"> {}

/** The part of the track between the origin and the value */
export function SliderRange(props: SliderRangeProps): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getRangeProps(), props),
  )
}
