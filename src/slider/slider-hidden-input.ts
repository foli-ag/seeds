import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { useSliderThumbPropsContext } from "./use-slider-thumb-context.js"

export interface SliderHiddenInputProps extends PartProps<"input"> {}

/** Carries the value of the thumb around it into forms */
export function SliderHiddenInput(props: SliderHiddenInputProps): Element {
  const api = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(thumbProps), props),
  )
}
