import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Marks whether its branch is expanded with `data-state`, for a chevron that turns */
export function TreeViewBranchIndicator<As extends ValidComponent = "div">(
  props: TreeViewBranchIndicatorProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "div",
    mergeProps(() => api().getBranchIndicatorProps(nodeProps), props),
  )
}
