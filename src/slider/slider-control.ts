import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"

export type SliderControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the track and the thumbs, and takes the pointer */
export function SliderControl<As extends ValidComponent = "div">(props: SliderControlProps<As>): Element {
  const api = useSliderContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
