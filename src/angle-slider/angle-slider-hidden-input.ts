import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useAngleSliderContext } from "./use-angle-slider-context.js"

export type AngleSliderHiddenInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** Carries the value into forms under the root's `name` */
export function AngleSliderHiddenInput<As extends ValidComponent = "input">(
  props: AngleSliderHiddenInputProps<As>,
): Element {
  const api = useAngleSliderContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(), props),
  )
}
