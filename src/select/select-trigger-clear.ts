import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectTriggerClearProps extends PartProps<"button"> {}

/** Clears the value */
export function SelectTriggerClear(props: SelectTriggerClearProps): Element {
  const api = useSelectContext()
  return render(
    "button",
    mergeProps(() => api().getClearTriggerProps(), props),
  )
}
