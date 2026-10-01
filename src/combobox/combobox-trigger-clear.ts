import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useComboboxContext } from "./use-combobox-context.js"

export type ComboboxTriggerClearProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Clears the value */
export function ComboboxTriggerClear<As extends ValidComponent = "button">(
  props: ComboboxTriggerClearProps<As>,
): Element {
  const api = useComboboxContext()
  return render(
    "button",
    mergeProps(() => api().getClearTriggerProps(), props),
  )
}
