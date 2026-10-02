import type { NodeProps } from "@zag-js/tree-view"
import { createMemo, type Element } from "solid-js"
import { provide } from "../utils/flow.js"
import { splitProps } from "../utils/split-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { TreeViewNodePropsProvider, TreeViewNodeStateProvider } from "./use-tree-view-node-context.js"

export interface TreeViewNodeProviderProps extends NodeProps {
  children?: Element
}

/** Tells the parts inside it which node of the collection they belong to, and where it sits in the tree */
export function TreeViewNodeProvider(props: TreeViewNodeProviderProps): Element {
  const [nodeProps] = splitProps(props, ["node", "indexPath"])
  const api = useTreeViewContext()
  const nodeState = createMemo(() => api().getNodeState(nodeProps))
  return provide(TreeViewNodePropsProvider, nodeProps, () =>
    provide(TreeViewNodeStateProvider, nodeState, () => props.children),
  )
}
