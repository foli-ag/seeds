import type * as drawer from "@zag-js/drawer"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As, drawer.ContentProps>

/**
 * The panel, which follows a swipe in `swipeDirection` and closes or settles on a snap point when released. With
 * `draggable={false}` only the grabber drags it.
 */
export function DrawerContent<As extends ValidComponent = "div">(props: DrawerContentProps<As>): Element {
  const [contentProps, localProps] = splitProps(props, ["draggable"])
  const api = useDrawerContext()
  // The drawer waits for this presence to end the exit animation before it counts as closed
  const presence = usePresenceContext()
  const merged = mergeProps(
    () => api().getContentProps({ draggable: contentProps.draggable ?? true }),
    () => presence().presenceProps,
    localProps,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
