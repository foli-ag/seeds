import { untrack, type Element } from "solid-js"
import type { UseTooltipReturn } from "./use-tooltip.js"
import { useTooltipContext } from "./use-tooltip-context.js"

export interface TooltipContextProps {
  children: (api: UseTooltipReturn) => Element
}

/** Renders `children` with the tooltip's API */
export function TooltipContext(props: TooltipContextProps): Element {
  return untrack(() => props.children(useTooltipContext()))
}
