import { createComponent, type Element } from "solid-js"
import { CollapsibleContent } from "../collapsible/collapsible-content.js"
import type { PolymorphicProps, ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTreeViewContext } from "./use-tree-view-context.js"
import { useTreeViewNodePropsContext } from "./use-tree-view-node-context.js"

export type TreeViewBranchContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Holds the children of its branch */
export function TreeViewBranchContent<As extends ValidComponent = "div">(
  props: TreeViewBranchContentProps<As>,
): Element {
  const api = useTreeViewContext()
  const nodeProps = useTreeViewNodePropsContext()
  // The collapsible shows and hides the content, which the tree view only describes
  const contentProps = () => {
    const rest: Record<string, unknown> = { ...api().getBranchContentProps(nodeProps) }
    delete rest.hidden
    delete rest["data-state"]
    return rest
  }
  return createComponent(CollapsibleContent, mergeProps(contentProps, props))
}
