import type * as menu from "@zag-js/menu"
import { createEffect, createMemo, untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { MenuItemPropsProvider, MenuItemProvider } from "./use-menu-item-context.js"

export type MenuItemProps<As extends ValidComponent = "div"> = PolymorphicProps<
  As,
  menu.ItemProps & {
    /** Called when the item is selected, by click or keyboard */
    onSelect?: VoidFunction | undefined
  }
>

export function MenuItem<As extends ValidComponent = "div">(props: MenuItemProps<As>): Element {
  const [itemProps, localProps] = splitProps(props, ["closeOnSelect", "disabled", "value", "valueText", "onSelect"])
  const api = useMenuContext()
  const itemState = createMemo(() => api().getItemState(itemProps))
  // zag fires selection on the item's element, which exists once the item has rendered
  createEffect(
    () => itemState().id,
    (id) => untrack(api).addItemListener({ id, onSelect: () => itemProps.onSelect?.() }),
  )
  return provide(MenuItemPropsProvider, itemProps, () =>
    provide(MenuItemProvider, itemState, () =>
      render(
        "div",
        mergeProps(() => api().getItemProps(itemProps), localProps),
      ),
    ),
  )
}
