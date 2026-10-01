import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverIndicatorProps extends PartProps<"div"> {}

/** Marks the open state with `data-state`, for a chevron that turns */
export function PopoverIndicator(props: PopoverIndicatorProps): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
