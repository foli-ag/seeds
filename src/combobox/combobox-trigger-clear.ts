import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export interface ComboboxTriggerClearProps extends PartProps<"button"> {}

/** Clears the value */
export function ComboboxTriggerClear(props: ComboboxTriggerClearProps): Element {
  const api = useComboboxContext()
  return render(
    "button",
    mergeProps(() => api().getClearTriggerProps(), props),
  )
}
