import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewNodeRenameInputProps<As extends ValidComponent = "input"> = PolymorphicProps<As>

/** Edits its node's label while the node is being renamed, and is hidden otherwise */
export function TreeViewNodeRenameInput<As extends ValidComponent = "input">(
  props: TreeViewNodeRenameInputProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "input",
    mergeProps(() => api().getNodeRenameInputProps(nodeProps), props),
  )
}
