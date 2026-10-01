import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverArrowTipProps<As extends ValidComponent = "div"> = PartProps<As>

/** The visible part of the arrow */
export function PopoverArrowTip<As extends ValidComponent = "div">(props: PopoverArrowTipProps<As>): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getArrowTipProps(), props),
  )
}
