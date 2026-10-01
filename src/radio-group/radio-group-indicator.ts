import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useRadioGroupContext } from "./use-radio-group-context"

export interface RadioGroupIndicatorProps extends PartProps<"div"> {}

/** Sized and placed over the checked item through CSS variables, for a highlight that slides between items */
export function RadioGroupIndicator(props: RadioGroupIndicatorProps): Element {
  const api = useRadioGroupContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
