import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"
import { useNavigationMenuItemProps } from "./use-navigation-menu-item.js"

export type NavigationMenuItemIndicatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Marks the item around it as open with `data-state`, for a chevron that turns */
export function NavigationMenuItemIndicator<As extends ValidComponent = "div">(
  props: NavigationMenuItemIndicatorProps<As>,
): Element {
  const api = useNavigationMenuContext()
  const item = useNavigationMenuItemProps("Item.Indicator")
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(item), props),
  )
}
