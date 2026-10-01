import { untrack, type Element } from "solid-js"
import { useMenuContext, type UseMenuContext } from "./use-menu-context.js"

export interface MenuContextProps {
  children: (api: UseMenuContext) => Element
}

/** Renders `children` with the menu's API */
export function MenuContext(props: MenuContextProps): Element {
  return untrack(() => props.children(useMenuContext()))
}
