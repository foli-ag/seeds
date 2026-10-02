import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useHoverCardContext } from "./use-hover-card-context.js"

export type HoverCardArrowProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Points at the trigger from the content, sized through `--arrow-size` */
export function HoverCardArrow<As extends ValidComponent = "div">(props: HoverCardArrowProps<As>): Element {
  const api = useHoverCardContext()
  return render(
    "div",
    mergeProps(() => api().getArrowProps(), props),
  )
}
