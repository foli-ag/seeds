import { createUniqueId, type Element } from "solid-js"
import type { PartProps } from "../utils/factory.js"
import { splitProps } from "../utils/split-props.js"
import { provideGroup } from "./menu-group.js"
import type { MenuGroupContext } from "./use-menu-group-context.js"

export interface MenuGroupRadioProps extends PartProps<"div", Partial<MenuGroupContext>> {}

/** Groups `Item.Radio` items, of which the one holding `value` is checked */
export function MenuGroupRadio(props: MenuGroupRadioProps): Element {
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
