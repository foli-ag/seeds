import { createContext, useContext } from "solid-js"
import type { UsePaginationReturn } from "./use-pagination.js"

export const PaginationProvider = /* @__PURE__ */ createContext<UsePaginationReturn>()

export const usePaginationContext = (): UsePaginationReturn => useContext(PaginationProvider)
