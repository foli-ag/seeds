import type { NodeProps, NodeState } from "@zag-js/tree-view"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseTreeViewNodeContext = Accessor<NodeState>

export const TreeViewNodeStateProvider = /* @__PURE__ */ createContext<UseTreeViewNodeContext>()

/** The state of the node around the caller */
export const useTreeViewNodeContext = (): UseTreeViewNodeContext => useContext(TreeViewNodeStateProvider)

/** The node and index path around the caller, which its parts pass back to the tree view */
export const TreeViewNodePropsProvider = /* @__PURE__ */ createContext<NodeProps>()

export const useTreeViewNodePropsContext = (): NodeProps => useContext(TreeViewNodePropsProvider)
