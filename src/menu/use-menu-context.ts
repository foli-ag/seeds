import type { PropTypes } from "@foliag/zag"
import type * as menu from "@zag-js/menu"
import { createContext, useContext, type Accessor } from "solid-js"
import type { UseMenuReturn } from "./use-menu.js"

export type UseMenuContext = Accessor<menu.Api<PropTypes>>

export const MenuProvider = /* @__PURE__ */ createContext<UseMenuContext>()

/** The API of the menu around the caller */
export const useMenuContext = (): UseMenuContext => useContext(MenuProvider)

/** The menu around a root, which makes that root a submenu */
export const MenuParentProvider = /* @__PURE__ */ createContext<UseMenuReturn | null>(null)

/** The props of the item in the parent menu that opens the submenu around the caller */
export const MenuTriggerItemProvider = /* @__PURE__ */ createContext<Accessor<PropTypes["element"]> | null>(null)
