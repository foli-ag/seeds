import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"

export type TreeViewLabelProps<As extends ValidComponent = "h3"> = PolymorphicProps<As>

/** Names the tree */
export function TreeViewLabel<As extends ValidComponent = "h3">(props: TreeViewLabelProps<As>): Element {
  const api = useTreeViewContext()
  return render(
    "h3",
    mergeProps(() => api().getLabelProps(), props),
  )
}
