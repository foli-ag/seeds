import { untrack, type Element } from "solid-js"
import type { UseTreeViewReturn } from "./use-tree-view.js"
import { useTreeViewContext } from "./use-tree-view-context.js"

export interface TreeViewContextProps {
  children: (api: UseTreeViewReturn) => Element
}

/** Renders `children` with the tree view's API */
export function TreeViewContext(props: TreeViewContextProps): Element {
  return untrack(() => props.children(useTreeViewContext()))
}
