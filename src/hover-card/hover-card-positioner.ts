import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useHoverCardContext } from "./use-hover-card-context.js"

export type HoverCardPositionerProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Placed next to the trigger, and holds the content */
export function HoverCardPositioner<As extends ValidComponent = "div">(props: HoverCardPositionerProps<As>): Element {
  const api = useHoverCardContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
