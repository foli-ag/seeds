import type { ItemProps } from "@zag-js/navigation-menu"
import { useContext } from "solid-js"
import { NavigationMenuItemPropsProvider } from "./use-navigation-menu-context.js"

/** The props of the item around a part that only works inside one */
export function useNavigationMenuItemProps(part: string): ItemProps {
  const item = useContext(NavigationMenuItemPropsProvider)
  if (!item) throw new Error(`NavigationMenu.${part} must be used within NavigationMenu.Item`)
  return item
}
