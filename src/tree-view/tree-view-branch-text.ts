import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function TreeViewBranchText<As extends ValidComponent = "span">(props: TreeViewBranchTextProps<As>): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "span",
    mergeProps(() => api().getBranchTextProps(nodeProps), props),
  )
}
