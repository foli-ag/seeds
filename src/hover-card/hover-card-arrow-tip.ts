import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useHoverCardContext } from "./use-hover-card-context.js"

export type HoverCardArrowTipProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The visible part of the arrow */
export function HoverCardArrowTip<As extends ValidComponent = "div">(props: HoverCardArrowTipProps<As>): Element {
  const api = useHoverCardContext()
  return render(
    "div",
    mergeProps(() => api().getArrowTipProps(), props),
  )
}
