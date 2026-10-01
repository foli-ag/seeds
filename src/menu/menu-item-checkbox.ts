import type * as menu from "@zag-js/menu"
import { createMemo, merge, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { MenuItemPropsProvider, MenuItemProvider } from "./use-menu-item-context.js"

export type MenuItemCheckboxProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  Omit<menu.OptionItemProps, "type">
>

/** An item that toggles `checked` */
export function MenuItemCheckbox<As extends ValidComponent = "div">(props: MenuItemCheckboxProps<As>): Element {
  const [partialItemProps, localProps] = splitProps(props, [
    "checked",
    "closeOnSelect",
    "disabled",
    "onCheckedChange",
    "value",
    "valueText",
  ])
  const itemProps = merge(partialItemProps, { type: "checkbox" }) as menu.OptionItemProps
  const api = useMenuContext()
  const itemState = createMemo(() => api().getOptionItemState(itemProps))
  return provide(MenuItemPropsProvider, itemProps, () =>
    provide(MenuItemProvider, itemState, () =>
      render(
        "div",
        mergeProps(() => api().getOptionItemProps(itemProps), localProps),
      ),
    ),
  )
}
