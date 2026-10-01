import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxLabelProps extends PartProps<"label"> {}

export function ComboboxLabel(props: ComboboxLabelProps): Element {
  const api = useComboboxContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
