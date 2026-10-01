import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export interface SliderControlProps extends PartProps<"div"> {}

/** Holds the track and the thumbs, and takes the pointer */
export function SliderControl(props: SliderControlProps): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
