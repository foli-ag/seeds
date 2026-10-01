import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRadioGroupContext } from "./use-radio-group-context.js"

export type RadioGroupLabelProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** Names the group */
export function RadioGroupLabel<As extends ValidComponent = "span">(props: RadioGroupLabelProps<As>): Element {
  const api = useRadioGroupContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
