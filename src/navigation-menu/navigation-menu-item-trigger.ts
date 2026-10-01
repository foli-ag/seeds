import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"
import { useNavigationMenuItemProps } from "./use-navigation-menu-item.js"

export interface NavigationMenuItemTriggerProps
  extends PartProps<
    "button",
    {
      /** Disables the trigger, which otherwise follows its item */
      disabled?: boolean | undefined
    }
  > {}

/** Opens the content of the item around it, on click or hover */
export function NavigationMenuItemTrigger(props: NavigationMenuItemTriggerProps): Element {
  const [, localProps] = splitProps(props, ["disabled"])
  const item = useNavigationMenuItemProps("Item.Trigger")
  const triggerProps = {
    get value() {
      return item.value
    },
    get disabled() {
      return props.disabled ?? item.disabled
    },
  }
  const api = useNavigationMenuContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(triggerProps), localProps),
  )
}
