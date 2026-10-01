import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxInputProps<As extends ValidComponent = "input"> = PartProps<As>

/** Filters the items as the user types */
export function ComboboxInput<As extends ValidComponent = "input">(props: ComboboxInputProps<As>): Element {
  const api = useComboboxContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(), props),
  )
}
