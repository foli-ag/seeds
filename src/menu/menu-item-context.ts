import { untrack, type Element } from "solid-js"
import { useMenuItemContext, type UseMenuItemContext } from "./use-menu-item-context.js"

export interface MenuItemContextProps {
  children: (item: UseMenuItemContext) => Element
}

/** Renders `children` with the state of the item around it */
export function MenuItemContext(props: MenuItemContextProps): Element {
  return untrack(() => props.children(useMenuItemContext()))
}
