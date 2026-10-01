import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverArrowTipProps extends PartProps<"div"> {}

/** The visible part of the arrow */
export function PopoverArrowTip(props: PopoverArrowTipProps): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getArrowTipProps(), props),
  )
}
