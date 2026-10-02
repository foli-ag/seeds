import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresence, useRenderStrategyContext } from "../utils/presence.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerBackdropProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Dims the page behind the drawer, fading through `--drawer-swipe-progress` while it is swiped */
export function DrawerBackdrop<As extends ValidComponent = "div">(props: DrawerBackdropProps<As>): Element {
  const api = useDrawerContext()
  // The backdrop animates on its own, so it runs a presence of its own
  const strategy = useRenderStrategyContext()
  const presence = usePresence(() => ({ ...strategy(), present: api().open }))
  const merged = mergeProps(
    () => api().getBackdropProps(),
    () => presence().presenceProps,
    props,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
