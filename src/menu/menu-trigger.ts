import type * as menu from "@zag-js/menu"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useMenuContext } from "./use-menu-context.js"

export type MenuTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, menu.TriggerProps>

/** Opens and closes the menu, and is also `Menu.Trigger.Open` */
export function MenuTrigger<As extends ValidComponent = "button">(props: MenuTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = useMenuContext()
  const presence = usePresenceContext()
  return render(
    "button",
    mergeProps(
      () => api().getTriggerProps(triggerProps),
      // Points at nothing while the content is unmounted
      () => ({ "aria-controls": presence().unmounted ? null : undefined }),
      localProps,
    ),
  )
}
