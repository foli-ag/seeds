import type { ItemBaseProps, ItemState } from "@zag-js/menu"
import { createContext, useContext, type Accessor } from "solid-js"

export type UseMenuItemContext = Accessor<ItemState>

export const MenuItemProvider = /* @__PURE__ */ createContext<UseMenuItemContext>()

/** The state of the item around the caller */
export const useMenuItemContext = (): UseMenuItemContext => useContext(MenuItemProvider)

/** The props of the item around the caller, which its parts pass back to the menu */
export const MenuItemPropsProvider = /* @__PURE__ */ createContext<ItemBaseProps>()

export const useMenuItemPropsContext = (): ItemBaseProps => useContext(MenuItemPropsProvider)
