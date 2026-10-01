import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuItemPropsContext } from "./use-menu-item-context.js"

export interface MenuItemTextProps extends PartProps<"div"> {}

export function MenuItemText(props: MenuItemTextProps): Element {
  const api = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemTextProps(itemProps), props),
  )
}
