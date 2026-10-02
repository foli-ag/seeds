import { untrack, type Element } from "solid-js"
import type { UsePaginationReturn } from "./use-pagination.js"
import { usePaginationContext } from "./use-pagination-context.js"

export interface PaginationContextProps {
  children: (api: UsePaginationReturn) => Element
}

/** Renders `children` with the pagination's API, whose `pages` lists the items and ellipses to render */
export function PaginationContext(props: PaginationContextProps): Element {
  return untrack(() => props.children(usePaginationContext()))
}
