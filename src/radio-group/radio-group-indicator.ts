import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"

export type RadioGroupIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Sized and placed over the checked item through CSS variables, for a highlight that slides between items */
export function RadioGroupIndicator<As extends ValidComponent = "div">(props: RadioGroupIndicatorProps<As>): Element {
  const api = useRadioGroupContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
