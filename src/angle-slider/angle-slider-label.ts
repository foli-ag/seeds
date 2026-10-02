import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

/** Names the thumb, and focuses it when clicked */
export function AngleSliderLabel<As extends ValidComponent = "label">(props: AngleSliderLabelProps<As>): Element {
  const api = useAngleSliderContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
