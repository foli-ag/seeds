import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { useSliderThumbPropsContext } from "./use-slider-thumb-context.js"

export type SliderHiddenInputProps<As extends ValidComponent = "input"> = PartProps<As>

/** Carries the value of the thumb around it into forms */
export function SliderHiddenInput<As extends ValidComponent = "input">(props: SliderHiddenInputProps<As>): Element {
  const api = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(thumbProps), props),
  )
}
