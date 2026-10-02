import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderMarkerGroupProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function AngleSliderMarkerGroup<As extends ValidComponent = "div">(
  props: AngleSliderMarkerGroupProps<As>,
): Element {
  const api = useAngleSliderContext()
  return render(
    "div",
    mergeProps(() => api().getMarkerGroupProps(), props),
  )
}
