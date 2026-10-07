import type { PropTypes } from "@foliag/zag"
import type { TreeCollection, TreeNode } from "@zag-js/collection"
import * as treeView from "@zag-js/tree-view"
import type { Accessor } from "solid-js"
import type { MaybeAccessor, Optional } from "../utils/types.js"
import { useApi } from "../utils/use-api.js"

export interface UseTreeViewProps<T extends TreeNode = TreeNode>
  extends Optional<Omit<treeView.Props<T>, "collection" | "dir" | "getRootNode">, "id"> {
  /** The nodes of the tree, from `createTreeCollection` */
  collection: TreeCollection<T>
}

export type UseTreeViewReturn<T extends TreeNode = TreeNode> = Accessor<treeView.Api<PropTypes, T>>

export function useTreeView<T extends TreeNode = TreeNode>(
  props: MaybeAccessor<UseTreeViewProps<T>>,
): UseTreeViewReturn<T> {
  return useApi(treeView.machine, treeView.connect, props) as UseTreeViewReturn<T>
}
