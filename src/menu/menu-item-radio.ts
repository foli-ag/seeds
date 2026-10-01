import type * as menu from "@zag-js/menu"
import { createMemo, merge, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useMenuContext } from "./use-menu-context.js"
import { useMenuGroupContext } from "./use-menu-group-context.js"
import { MenuItemPropsProvider, MenuItemProvider } from "./use-menu-item-context.js"

export interface MenuItemRadioProps extends PartProps<"div", menu.ItemProps> {}

/** An item of a `Menu.Group.Radio`, checked while it holds the group's value */
export function MenuItemRadio(props: MenuItemRadioProps): Element {
  const [partialItemProps, localProps] = splitProps(props, ["closeOnSelect", "disabled", "value", "valueText"])
  const group = useMenuGroupContext()
  const itemProps = merge(partialItemProps, {
    type: "radio",
    get checked() {
      return group.value === partialItemProps.value
    },
    onCheckedChange: () => group.onValueChange?.({ value: partialItemProps.value }),
  }) as menu.OptionItemProps
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
