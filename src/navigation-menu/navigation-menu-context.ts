import { untrack, type Element } from "solid-js"
import type { UseNavigationMenuReturn } from "./use-navigation-menu.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"

export interface NavigationMenuContextProps {
  children: (api: UseNavigationMenuReturn) => Element
}

/** Renders `children` with the navigation menu's API */
export function NavigationMenuContext(props: NavigationMenuContextProps): Element {
  return untrack(() => props.children(useNavigationMenuContext()))
}
