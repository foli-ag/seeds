import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxLabelProps<As extends ValidComponent = "label"> = PolymorphicProps<As>

export function ComboboxLabel<As extends ValidComponent = "label">(props: ComboboxLabelProps<As>): Element {
  const api = useComboboxContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
