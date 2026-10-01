import { createContext, useContext } from "solid-js"
import type { UsePopoverReturn } from "./use-popover.js"

export const PopoverProvider = /* @__PURE__ */ createContext<UsePopoverReturn>()

export const usePopoverContext = (): UsePopoverReturn => useContext(PopoverProvider)
