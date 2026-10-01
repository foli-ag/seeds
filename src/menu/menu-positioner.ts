import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useMenuContext } from "./use-menu-context.js"

export interface MenuPositionerProps extends PartProps<"div"> {}

/** Placed next to the trigger, and holds the content */
export function MenuPositioner(props: MenuPositionerProps): Element {
  const api = useMenuContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
