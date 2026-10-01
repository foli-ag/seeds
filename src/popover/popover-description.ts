import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export interface PopoverDescriptionProps extends PartProps<"div"> {}

export function PopoverDescription(props: PopoverDescriptionProps): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getDescriptionProps(), props),
  )
}
