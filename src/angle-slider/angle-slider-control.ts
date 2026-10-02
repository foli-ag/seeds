import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The dial around the thumb, which takes the pointer. Its top is 0 degrees, and the angle grows clockwise. */
export function AngleSliderControl<As extends ValidComponent = "div">(props: AngleSliderControlProps<As>): Element {
  const api = useAngleSliderContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
