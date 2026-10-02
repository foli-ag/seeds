import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewNodeCheckboxProps<As extends ValidComponent = "span"> = PolymorphicProps<As>

/** Checks and unchecks its node, and a branch's descendants with it */
export function TreeViewNodeCheckbox<As extends ValidComponent = "span">(
  props: TreeViewNodeCheckboxProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  return render(
    "span",
    mergeProps(() => api().getNodeCheckboxProps(nodeProps), props),
  )
}
