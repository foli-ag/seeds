import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuItemPropsContext } from "./use-menu-item-context.js"

export interface MenuItemIndicatorProps extends PartProps<"div"> {}

/** Shown while the checkbox or radio item around it is checked */
export function MenuItemIndicator(props: MenuItemIndicatorProps): Element {
  const api = useMenuContext()
  const itemProps = useMenuItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getItemIndicatorProps(itemProps), props),
  )
}
