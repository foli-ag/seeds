import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverIndicatorProps<As extends ValidComponent = "div"> = PartProps<As>

/** Marks the open state with `data-state`, for a chevron that turns */
export function PopoverIndicator<As extends ValidComponent = "div">(props: PopoverIndicatorProps<As>): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
