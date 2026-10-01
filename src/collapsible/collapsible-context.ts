import { untrack, type Element } from "solid-js"
import type { UseCollapsibleReturn } from "./use-collapsible"
import { useCollapsibleContext } from "./use-collapsible-context"

export interface CollapsibleContextProps {
  children: (api: UseCollapsibleReturn) => Element
}

/** Renders `children` with the collapsible's API */
export function CollapsibleContext(props: CollapsibleContextProps): Element {
  return untrack(() => props.children(useCollapsibleContext()))
}
