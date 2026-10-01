import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuItemPropsContext } from "./use-menu-item-context.js"

export type MenuItemIndicatorProps<As extends ValidComponent = "div"> = PartProps<As>

/** Shown while the checkbox or radio item around it is checked */
export function MenuItemIndicator<As extends ValidComponent = "div">(props: MenuItemIndicatorProps<As>): Element {
  const api = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
