import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchTriggerProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Expands and collapses its branch without selecting it */
export function TreeViewBranchTrigger<As extends ValidComponent = "div">(
  props: TreeViewBranchTriggerProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "div",
    mergeProps(() => api().getBranchTriggerProps(nodeProps), props),
  )
}
