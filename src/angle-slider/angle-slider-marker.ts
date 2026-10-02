import type * as angleSlider from "@zag-js/angle-slider"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderMarkerProps<As extends ValidComponent = "div"> = PolymorphicProps<As, angleSlider.MarkerProps>

/** Rotated to the angle `value`. `data-state` says whether it is under, at or over the slider's value. */
export function AngleSliderMarker<As extends ValidComponent = "div">(props: AngleSliderMarkerProps<As>): Element {
  const [markerProps, localProps] = splitProps(props, ["value"])
  const api = useAngleSliderContext()
  return render(
    "div",
    mergeProps(() => api().getMarkerProps(markerProps), localProps),
  )
}
