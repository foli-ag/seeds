import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewItemIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Shown while the item around it is selected */
export function TreeViewItemIndicator<As extends ValidComponent = "div">(
  props: TreeViewItemIndicatorProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(nodeProps), props),
  )
}
