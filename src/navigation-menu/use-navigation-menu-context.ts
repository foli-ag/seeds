import type { ItemProps, ViewportProps } from "@zag-js/navigation-menu"
import { createContext, useContext } from "solid-js"
import type { UseNavigationMenuReturn } from "./use-navigation-menu.js"

export const NavigationMenuProvider = /* @__PURE__ */ createContext<UseNavigationMenuReturn>()

export const useNavigationMenuContext = (): UseNavigationMenuReturn => useContext(NavigationMenuProvider)

/** The props of the item around the caller, if any, which content and links take their value from */
export const NavigationMenuItemPropsProvider = /* @__PURE__ */ createContext<ItemProps | null>(null)

/** The props of the viewport positioner around the caller, if any */
export const NavigationMenuViewportPropsProvider = /* @__PURE__ */ createContext<ViewportProps | null>(null)
