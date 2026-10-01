import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { usePopoverContext } from "./use-popover-context.js"

export type PopoverDescriptionProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

export function PopoverDescription<As extends ValidComponent = "div">(props: PopoverDescriptionProps<As>): Element {
  const api = usePopoverContext()
  return render(
    "div",
    mergeProps(() => api().getDescriptionProps(), props),
  )
}
