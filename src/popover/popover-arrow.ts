import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverArrowProps extends PartProps<"div"> {}

/** Points at the trigger from the content, sized through `--arrow-size` */
export function PopoverArrow(props: PopoverArrowProps): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
