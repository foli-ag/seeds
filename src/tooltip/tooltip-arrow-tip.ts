import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useTooltipContext } from "./use-tooltip-context.js"

export type TooltipArrowTipProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The visible part of the arrow */
export function TooltipArrowTip<As extends ValidComponent = "div">(props: TooltipArrowTipProps<As>): Element {
  const api = useTooltipContext()
  return render(
    "div",
    mergeProps(() => api().getArrowTipProps(), props),
  )
}
