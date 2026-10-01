import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuItemPropsContext } from "./use-menu-item-context.js"

export type MenuItemTextProps<As extends ValidComponent = "div"> = PartProps<As>

export function MenuItemText<As extends ValidComponent = "div">(props: MenuItemTextProps<As>): Element {
  const api = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
