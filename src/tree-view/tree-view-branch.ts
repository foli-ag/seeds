import { createComponent, type Element } from "solid-js"
import { CollapsibleRoot, type CollapsibleRootProps } from "../collapsible/collapsible-root.js"
import type { PolymorphicProps, ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useRenderStrategyContext } from "../utils/presence.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodeContext, useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** A node with children, as a collapsible that the tree view expands and collapses */
export function TreeViewBranch<As extends ValidComponent = "div">(props: TreeViewBranchProps<As>): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  const nodeState = useTreeViewNodeContext()
  const strategy = useRenderStrategyContext()
  const merged = mergeProps(
    () => ({ ...strategy(), open: nodeState().expanded }),
    () => api().getBranchProps(nodeProps),
    props,
  )
  // The branch props are typed for the DOM, where `dir` may be false to remove the attribute
  return createComponent(CollapsibleRoot, merged as CollapsibleRootProps)
}
