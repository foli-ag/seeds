import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxControlProps extends PartProps<"div"> {}

/** Holds the input and the triggers */
export function ComboboxControl(props: ComboboxControlProps): Element {
  const api = useComboboxContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
