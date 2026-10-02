import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"

export type TreeViewTreeProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the top-level nodes, and moves focus between the nodes it holds with the keyboard */
export function TreeViewTree<As extends ValidComponent = "div">(props: TreeViewTreeProps<As>): Element {
  const api = useTreeViewContext()
  return render(
    "div",
    mergeProps(() => api().getTreeProps(), props),
  )
}
