import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTooltipContext } from "./use-tooltip-context.js"

export type TooltipArrowProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Points at the trigger from the content, sized through `--arrow-size` */
export function TooltipArrow<As extends ValidComponent = "div">(props: TooltipArrowProps<As>): Element {
  const api = useTooltipContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
