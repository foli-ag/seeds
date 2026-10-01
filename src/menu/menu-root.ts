import { omit, type Element } from "solid-js"
import { splitPresenceProps, type UsePresenceProps } from "../utils/presence.js"
import { provideMenu } from "./menu-root-provider.js"
import { useMenu, type UseMenuProps } from "./use-menu.js"

export interface MenuRootProps extends UseMenuProps, Omit<UsePresenceProps, "present"> {
  children?: Element
}

/** A menu, or a submenu when inside another menu's content */
export function MenuRoot(props: MenuRootProps): Element {
  const [presenceProps, menuProps] = splitPresenceProps(props)
  const menu = useMenu(omit(menuProps, "children"))
  return provideMenu(menu, presenceProps, () => props.children)
}
