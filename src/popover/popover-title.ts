import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverTitleProps<As extends ValidComponent = "div"> = PartProps<As>

export function PopoverTitle<As extends ValidComponent = "div">(props: PopoverTitleProps<As>): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getTitleProps(), props),
  )
}
