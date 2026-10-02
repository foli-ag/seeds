import { TreeViewBranch } from "./tree-view-branch.js"
import { TreeViewBranchContent } from "./tree-view-branch-content.js"
import { TreeViewBranchControl } from "./tree-view-branch-control.js"
import { TreeViewBranchIndentGuide } from "./tree-view-branch-indent-guide.js"
import { TreeViewBranchIndicator } from "./tree-view-branch-indicator.js"
import { TreeViewBranchText } from "./tree-view-branch-text.js"
import { TreeViewBranchTrigger } from "./tree-view-branch-trigger.js"
import { TreeViewItem } from "./tree-view-item.js"
import { TreeViewItemIndicator } from "./tree-view-item-indicator.js"
import { TreeViewItemText } from "./tree-view-item-text.js"

export type { TreeViewBranchProps as BranchProps } from "./tree-view-branch.js"
export type { TreeViewBranchContentProps as BranchContentProps } from "./tree-view-branch-content.js"
export type { TreeViewBranchControlProps as BranchControlProps } from "./tree-view-branch-control.js"
export type { TreeViewBranchIndentGuideProps as BranchIndentGuideProps } from "./tree-view-branch-indent-guide.js"
export type { TreeViewBranchIndicatorProps as BranchIndicatorProps } from "./tree-view-branch-indicator.js"
export type { TreeViewBranchTextProps as BranchTextProps } from "./tree-view-branch-text.js"
export type { TreeViewBranchTriggerProps as BranchTriggerProps } from "./tree-view-branch-trigger.js"
export { TreeViewContext as Context, type TreeViewContextProps as ContextProps } from "./tree-view-context.js"
export type { TreeViewItemProps as ItemProps } from "./tree-view-item.js"
export type { TreeViewItemIndicatorProps as ItemIndicatorProps } from "./tree-view-item-indicator.js"
export type { TreeViewItemTextProps as ItemTextProps } from "./tree-view-item-text.js"
export { TreeViewLabel as Label, type TreeViewLabelProps as LabelProps } from "./tree-view-label.js"
export * as Node from "./tree-view-node.js"
export type { TreeViewNodeCheckboxProps as NodeCheckboxProps } from "./tree-view-node-checkbox.js"
export type { TreeViewNodeCheckboxIndicatorProps as NodeCheckboxIndicatorProps } from "./tree-view-node-checkbox-indicator.js"
export type { TreeViewNodeContextProps as NodeContextProps } from "./tree-view-node-context.js"
export type { TreeViewNodeProviderProps as NodeProviderProps } from "./tree-view-node-provider.js"
export type { TreeViewNodeRenameInputProps as NodeRenameInputProps } from "./tree-view-node-rename-input.js"
export { TreeViewRoot as Root, type TreeViewRootProps as RootProps } from "./tree-view-root.js"
export {
  TreeViewRootProvider as RootProvider,
  type TreeViewRootProviderProps as RootProviderProps,
} from "./tree-view-root-provider.js"
export { TreeViewTree as Tree, type TreeViewTreeProps as TreeProps } from "./tree-view-tree.js"
export type {
  CheckedChangeDetails,
  CheckedState,
  ExpandedChangeDetails,
  FocusChangeDetails,
  LoadChildrenCompleteDetails,
  LoadChildrenDetails,
  LoadChildrenErrorDetails,
  NodeProps,
  NodeState,
  RenameCompleteDetails,
  RenameStartDetails,
  ScrollToIndexDetails,
  SelectionChangeDetails,
} from "@zag-js/tree-view"

export const Branch = /* @__PURE__ */ Object.assign(TreeViewBranch, {
  Control: TreeViewBranchControl,
  Indicator: TreeViewBranchIndicator,
  Text: TreeViewBranchText,
  Trigger: TreeViewBranchTrigger,
  Content: TreeViewBranchContent,
  IndentGuide: TreeViewBranchIndentGuide,
})

export const Item = /* @__PURE__ */ Object.assign(TreeViewItem, {
  Text: TreeViewItemText,
  Indicator: TreeViewItemIndicator,
})
