import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useNavigationMenuContext } from "./use-navigation-menu-context.js"
import { useNavigationMenuItemProps } from "./use-navigation-menu-item.js"

export type NavigationMenuItemTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<
  As,
  {
    /** Disables the trigger, which otherwise follows its item */
    disabled?: boolean | undefined
  }
>

/** Opens the content of the item around it, on click or hover */
export function NavigationMenuItemTrigger<As extends ValidComponent = "button">(
  props: NavigationMenuItemTriggerProps<As>,
): Element {
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
