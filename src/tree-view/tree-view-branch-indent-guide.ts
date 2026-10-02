import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchIndentGuideProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** A line along its branch's children, placed by `data-depth` */
export function TreeViewBranchIndentGuide<As extends ValidComponent = "div">(
  props: TreeViewBranchIndentGuideProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "div",
    mergeProps(() => api().getBranchIndentGuideProps(nodeProps), props),
  )
}
