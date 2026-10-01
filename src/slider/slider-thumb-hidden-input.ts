import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSliderContext } from "./use-slider-context.js"
import { useSliderThumbPropsContext } from "./use-slider-thumb-context.js"

export interface SliderThumbHiddenInputProps extends PartProps<"input"> {}

/** Carries its thumb's value into forms */
export function SliderThumbHiddenInput(props: SliderThumbHiddenInputProps): Element {
  const api = useSliderContext()
  const thumbProps = useSliderThumbPropsContext()
  return render(
    "input",
    mergeProps(() => api().getHiddenInputProps(thumbProps), props),
  )
}
