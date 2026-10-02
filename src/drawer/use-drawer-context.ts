import { createContext, useContext } from "solid-js"
import type { UseDrawerReturn } from "./use-drawer.js"

export const DrawerProvider = /* @__PURE__ */ createContext<UseDrawerReturn>()

export const useDrawerContext = (): UseDrawerReturn => useContext(DrawerProvider)
