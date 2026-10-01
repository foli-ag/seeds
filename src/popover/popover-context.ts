import { untrack, type Element } from "solid-js"
import type { UsePopoverReturn } from "./use-popover.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverContextProps {
  children: (api: UsePopoverReturn) => Element
}

/** Renders `children` with the popover's API */
export function PopoverContext(props: PopoverContextProps): Element {
  return untrack(() => props.children(usePopoverContext()))
}
