import type * as popover from "@zag-js/popover"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { splitProps } from "../utils/split-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverTriggerProps<As extends ValidComponent = "button"> = PolymorphicProps<As, popover.TriggerProps>

/** Opens and closes the popover, and is also `Popover.Trigger.Open` */
export function PopoverTrigger<As extends ValidComponent = "button">(props: PopoverTriggerProps<As>): Element {
  const [triggerProps, localProps] = splitProps(props, ["value"])
  const api = usePopoverContext()
  const presence = usePresenceContext()
  return render(
    "button",
    mergeProps(
      () => api().getTriggerProps(triggerProps),
      // Points at nothing while the content is unmounted
      () => ({ "aria-controls": presence().unmounted ? null : undefined }),
      localProps,
    ),
  )
}
