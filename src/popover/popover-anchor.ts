import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverAnchorProps<As extends ValidComponent = "div"> = PartProps<As>

/** Positions the content against itself instead of the trigger */
export function PopoverAnchor<As extends ValidComponent = "div">(props: PopoverAnchorProps<As>): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getAnchorProps(), props),
  )
}
