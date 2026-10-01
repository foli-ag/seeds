import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderMarkerGroupProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function SliderMarkerGroup<As extends ValidComponent = "div">(props: SliderMarkerGroupProps<As>): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getMarkerGroupProps(), props),
  )
}
