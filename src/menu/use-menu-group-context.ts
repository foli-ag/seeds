import { createContext, useContext } from "solid-js"

export interface ValueChangeDetails {
  value: string
}

export interface MenuGroupContext {
  id: string
  /** The checked item of a radio group */
  value?: string | undefined
  onValueChange?: ((details: ValueChangeDetails) => void) | undefined
}

export const MenuGroupProvider = /* @__PURE__ */ createContext<MenuGroupContext>()

/** The group around the caller */
export const useMenuGroupContext = (): MenuGroupContext => useContext(MenuGroupProvider)
