import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCheckboxContext } from "./use-checkbox-context.js"

export type CheckboxLabelProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function CheckboxLabel<As extends ValidComponent = "span">(props: CheckboxLabelProps<As>): Element {
  const api = useCheckboxContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
