import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { show } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePresenceContext } from "../utils/presence.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverContentProps<As extends ValidComponent = "div"> = PartProps<As>

export function PopoverContent<As extends ValidComponent = "div">(props: PopoverContentProps<As>): Element {
  const api = usePopoverContext()
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
