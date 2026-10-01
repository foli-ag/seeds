import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverAnchorProps extends PartProps<"div"> {}

/** Positions the content against itself instead of the trigger */
export function PopoverAnchor(props: PopoverAnchorProps): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getAnchorProps(), props),
  )
}
