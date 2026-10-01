import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxInputProps extends PartProps<"input"> {}

/** Filters the items as the user types */
export function ComboboxInput(props: ComboboxInputProps): Element {
  const api = useComboboxContext()
  return render(
    "input",
    mergeProps(() => api().getInputProps(), props),
  )
}
