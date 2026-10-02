import { untrack, type Element } from "solid-js"
import type { UseHoverCardReturn } from "./use-hover-card.js"
import { useHoverCardContext } from "./use-hover-card-context.js"

export interface HoverCardContextProps {
  children: (api: UseHoverCardReturn) => Element
}

/** Renders `children` with the hover card's API */
export function HoverCardContext(props: HoverCardContextProps): Element {
  return untrack(() => props.children(useHoverCardContext()))
}
