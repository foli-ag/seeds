import { untrack, type Element } from "solid-js"
import { useTreeViewNodeContext, type UseTreeViewNodeContext } from "./use-tree-view-node-context.js"

export interface TreeViewNodeContextProps {
  children: (node: UseTreeViewNodeContext) => Element
}

/** Renders `children` with the state of the node around it */
export function TreeViewNodeContext(props: TreeViewNodeContextProps): Element {
  return untrack(() => props.children(useTreeViewNodeContext()))
}
