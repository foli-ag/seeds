import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"
import { useNavigationMenuItemProps } from "./use-navigation-menu-item.js"

export interface NavigationMenuItemIndicatorProps extends PartProps<"div"> {}

/** Marks the item around it as open with `data-state`, for a chevron that turns */
export function NavigationMenuItemIndicator(props: NavigationMenuItemIndicatorProps): Element {
  const api = useNavigationMenuContext()
  const item = useNavigationMenuItemProps("Item.Indicator")
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(item), props),
  )
}
