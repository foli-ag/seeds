import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { useTooltipContext } from "./use-tooltip-context.js"

export type TooltipContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The `role="tooltip"` element, which describes the trigger while open unless the root has an `aria-label` */
export function TooltipContent<As extends ValidComponent = "div">(props: TooltipContentProps<As>): Element {
  const api = useTooltipContext()
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
