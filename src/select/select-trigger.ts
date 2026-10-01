import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As>

/** Opens and closes the select, and is also `Select.Trigger.Open` */
export function SelectTrigger<As extends ValidComponent = "button">(props: SelectTriggerProps<As>): Element {
  const api = useSelectContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(), props),
  )
}
