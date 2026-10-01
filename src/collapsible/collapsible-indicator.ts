import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useCollapsibleContext } from "./use-collapsible-context"

export interface CollapsibleIndicatorProps extends PartProps<"div"> {}

/** Marks the open state with `data-state`, for a chevron that turns */
export function CollapsibleIndicator(props: CollapsibleIndicatorProps): Element {
  const api = useCollapsibleContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
