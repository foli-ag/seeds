import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverTriggerCloseProps extends PartProps<"button"> {}

export function PopoverTriggerClose(props: PopoverTriggerCloseProps): Element {
  const api = usePopoverContext()
  return render(
    "button",
    mergeProps(() => api().getCloseTriggerProps(), props),
  )
}
