import type * as hoverCard from "@zag-js/hover-card"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useHoverCardContext } from "./use-hover-card-context.js"

export type HoverCardTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, hoverCard.TriggerProps>

/**
 * Opens the hover card `openDelay` after the pointer enters it or it takes focus. Triggers with distinct `value`s share
 * one hover card, which moves to the one last entered.
 */
export function HoverCardTrigger<As extends ValidComponent = "button">(props: HoverCardTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = useHoverCardContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(triggerProps), localProps),
  )
}
