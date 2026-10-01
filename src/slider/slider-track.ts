import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderTrackProps<As extends ValidComponent = "div"> = PartProps<As>

export function SliderTrack<As extends ValidComponent = "div">(props: SliderTrackProps<As>): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getTrackProps(), props),
  )
}
