import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewItemTextProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

export function TreeViewItemText<As extends ValidComponent = "span">(props: TreeViewItemTextProps<As>): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "span",
    mergeProps(() => api().getItemTextProps(nodeProps), props),
  )
}
