import type * as tooltip from "@zag-js/tooltip"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useTooltipContext } from "./use-tooltip-context.js"

export type TooltipTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, tooltip.TriggerProps>

/**
 * Opens the tooltip on hover after `openDelay` or on keyboard focus. Several triggers can share one tooltip, each
 * with its own `value`.
 */
export function TooltipTrigger<As extends ValidComponent = "button">(props: TooltipTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = useTooltipContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(triggerProps), localProps),
  )
}
