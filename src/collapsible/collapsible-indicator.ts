import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCollapsibleContext } from "./use-collapsible-context.js"

export interface CollapsibleIndicatorProps extends PartProps<"div"> {}

/** Marks the open state with `data-state`, for a chevron that turns */
export function CollapsibleIndicator(props: CollapsibleIndicatorProps): Element {
  const api = useCollapsibleContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(), props),
  )
}
