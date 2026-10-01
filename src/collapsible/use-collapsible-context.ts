import { createContext, useContext } from "solid-js"
import type { UseCollapsibleReturn } from "./use-collapsible"

export const CollapsibleProvider = createContext<UseCollapsibleReturn>()

export const useCollapsibleContext = (): UseCollapsibleReturn => useContext(CollapsibleProvider)
