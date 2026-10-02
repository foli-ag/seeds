import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useTooltipContext } from "./use-tooltip-context.js"

export type TooltipPositionerProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Placed next to the trigger, and holds the content */
export function TooltipPositioner<As extends ValidComponent = "div">(props: TooltipPositionerProps<As>): Element {
  const api = useTooltipContext()
  const presence = usePresenceContext()
  const merged = mergeProps(() => api().getPositionerProps(), props)
  return show(
    () => !presence().unmounted,
    () => render("div", merged),
  )
}
