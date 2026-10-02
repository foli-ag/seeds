import { createContext, useContext } from "solid-js"
import type { UseTreeViewReturn } from "./use-tree-view.js"

export const TreeViewProvider = /* @__PURE__ */ createContext<UseTreeViewReturn>()

export const useTreeViewContext = (): UseTreeViewReturn => useContext(TreeViewProvider)
