import type * as navigationMenu from "@zag-js/navigation-menu"
import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { NavigationMenuItemPropsProvider, useNavigationMenuContext } from "./use-navigation-menu-context.js"

export type NavigationMenuItemProps<As extends ValidComponent = "div"> = PartProps<As, navigationMenu.ItemProps>

/** An entry of the menu, with a trigger and its content, or a link */
export function NavigationMenuItem<As extends ValidComponent = "div">(props: NavigationMenuItemProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ["value", "disabled"])
  const api = useNavigationMenuContext()
  return provide(NavigationMenuItemPropsProvider, itemProps, () =>
    render(
      "div",
      mergeProps(() => api().getItemProps(itemProps), localProps),
    ),
  )
}
