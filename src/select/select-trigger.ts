import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectTriggerProps extends PartProps<"button"> {}

/** Opens and closes the select, and is also `Select.Trigger.Open` */
export function SelectTrigger(props: SelectTriggerProps): Element {
  const api = useSelectContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(), props),
  )
}
