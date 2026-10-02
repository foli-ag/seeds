import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useDrawerContext } from "./use-drawer-context.js"

export type DrawerPositionerProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function DrawerPositioner<As extends ValidComponent = "div">(props: DrawerPositionerProps<As>): Element {
  const api = useDrawerContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
