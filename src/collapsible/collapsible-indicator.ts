import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCollapsibleContext } from "./use-collapsible-context.js"

export type CollapsibleIndicatorProps<As extends ValidComponent = "div"> = PartProps<As>

/** Marks the open state with `data-state`, for a chevron that turns */
export function CollapsibleIndicator<As extends ValidComponent = "div">(props: CollapsibleIndicatorProps<As>): Element {
  const api = useCollapsibleContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
