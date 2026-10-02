// A node is either a branch or an item, so Node only groups the parts that work inside both
import { TreeViewNodeCheckbox } from "./tree-view-node-checkbox.js"
import { TreeViewNodeCheckboxIndicator } from "./tree-view-node-checkbox-indicator.js"

export { TreeViewNodeContext as Context } from "./tree-view-node-context.js"
export { TreeViewNodeProvider as Provider } from "./tree-view-node-provider.js"
export { TreeViewNodeRenameInput as RenameInput } from "./tree-view-node-rename-input.js"

export const Checkbox = /* @__PURE__ */ Object.assign(TreeViewNodeCheckbox, {
  Indicator: TreeViewNodeCheckboxIndicator,
})
