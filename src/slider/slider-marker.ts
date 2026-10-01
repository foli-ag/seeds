import type * as slider from "@zag-js/slider"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderMarkerProps<As extends ValidComponent = "span"> = PolymorphicProps<As, slider.MarkerProps>

/** Placed along the track at `value` */
export function SliderMarker<As extends ValidComponent = "span">(props: SliderMarkerProps<As>): Element {
  const [markerProps, localProps] = splitProps(props, ["value"])
  const api = useSliderContext()
  return render(
    "span",
    mergeProps(() => api().getMarkerProps(markerProps), localProps),
  )
}
