import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useHoverCardContext } from "./use-hover-card-context.js"

export type HoverCardContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Keeps the hover card open while the pointer is over it, and starts the close delay when it leaves */
export function HoverCardContent<As extends ValidComponent = "div">(props: HoverCardContentProps<As>): Element {
  const api = useHoverCardContext()
  const presence = usePresenceContext()
  const merged = mergeProps(
    () => api().getContentProps(),
    () => presence().presenceProps,
    props,
  )
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
