import { createUniqueId, type Element } from "solid-js"
import type { PartProps, ValidComponent } from "../utils/factory.js"
import { splitProps } from "../utils/split-props.js"
import { provideGroup } from "./menu-group.js"
import type { MenuGroupContext } from "./use-menu-group-context.js"

export type MenuGroupRadioProps<As extends ValidComponent = "div"> = PartProps<As, Partial<MenuGroupContext>>

/** Groups `Item.Radio` items, of which the one holding `value` is checked */
export function MenuGroupRadio<As extends ValidComponent = "div">(props: MenuGroupRadioProps<As>): Element {
  const [, localProps] = splitProps(props, ["id", "value", "onValueChange"])
  const id = createUniqueId()
  const group: MenuGroupContext = {
    get id() {
      return props.id ?? id
    },
    get value() {
      return props.value
    },
    get onValueChange() {
      return props.onValueChange
    },
  }
  return provideGroup(group, localProps)
}
