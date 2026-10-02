import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewItemProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** A node without children */
export function TreeViewItem<As extends ValidComponent = "div">(props: TreeViewItemProps<As>): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemProps(nodeProps), props),
  )
}
