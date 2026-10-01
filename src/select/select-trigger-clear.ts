import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectTriggerClearProps<As extends ValidComponent = "button"> = PartProps<As>

/** Clears the value */
export function SelectTriggerClear<As extends ValidComponent = "button">(props: SelectTriggerClearProps<As>): Element {
  const api = useSelectContext()
  return render(
    "button",
    mergeProps(() => api().getClearTriggerProps(), props),
  )
}
