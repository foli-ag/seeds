import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverTriggerCloseProps<As extends ValidComponent = "button"> = PartProps<As>

export function PopoverTriggerClose<As extends ValidComponent = "button">(
  props: PopoverTriggerCloseProps<As>,
): Element {
  const api = usePopoverContext()
  return render(
    "button",
    mergeProps(() => api().getCloseTriggerProps(), props),
  )
}
