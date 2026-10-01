import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverArrowProps<As extends ValidComponent = "div"> = PartProps<As>

/** Points at the trigger from the content, sized through `--arrow-size` */
export function PopoverArrow<As extends ValidComponent = "div">(props: PopoverArrowProps<As>): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
