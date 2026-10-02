import type { TreeNode } from "@zag-js/collection"
import * as treeView from "@zag-js/tree-view"
import type { Element } from "solid-js"
import type { PolymorphicProps, ValidComponent } from "../utils/factory.js"
import { renderStrategyKeys, type RenderStrategyProps } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { provideTreeView } from "./tree-view-root-provider.js"
import { useTreeView, type UseTreeViewProps } from "./use-tree-view.js"

export type TreeViewRootProps<T extends TreeNode = TreeNode, As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  UseTreeViewProps<T> & RenderStrategyProps
>

export function TreeViewRoot<T extends TreeNode = TreeNode, As extends ValidComponent = "div">(
  props: TreeViewRootProps<T, As>,
): Element {
  const [strategy, rest] = splitProps(props, renderStrategyKeys)
  const [treeViewProps, localProps] = splitProps(rest, treeView.props)
  const api = useTreeView(treeViewProps as UseTreeViewProps<T>)
  return provideTreeView(api, strategy, localProps)
}
