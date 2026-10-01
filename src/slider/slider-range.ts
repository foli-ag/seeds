import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderRangeProps<As extends ValidComponent = "div"> = PartProps<As>

/** The part of the track between the origin and the value */
export function SliderRange<As extends ValidComponent = "div">(props: SliderRangeProps<As>): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getRangeProps(), props),
  )
}
