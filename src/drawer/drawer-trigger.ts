import type * as drawer from "@zag-js/drawer"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, drawer.TriggerProps>

/** Opens the drawer, and is also `Drawer.Trigger.Open` */
export function DrawerTrigger<As extends ValidComponent = "button">(props: DrawerTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = useDrawerContext()
  const presence = usePresenceContext()
  const merged = mergeProps(
    () => api().getTriggerProps(triggerProps),
    // Points at nothing while the content is unmounted
    () => ({ "aria-controls": presence().unmounted ? null : undefined }),
    localProps,
  )
  return render("button", merged)
}
