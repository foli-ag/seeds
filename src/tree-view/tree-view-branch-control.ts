import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchControlProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The focusable row of its branch, which selects the branch and expands or collapses it */
export function TreeViewBranchControl<As extends ValidComponent = "div">(
  props: TreeViewBranchControlProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "div",
    mergeProps(() => api().getBranchControlProps(nodeProps), props),
  )
}
