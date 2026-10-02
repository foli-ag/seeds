import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressRangeProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The filled part of the track, as wide as the value's share, or as tall when vertical */
export function ProgressRange<As extends ValidComponent = "div">(props: ProgressRangeProps<As>): Element {
  const api = useProgressContext()
  return render(
    "div",
    mergeProps(() => api().getRangeProps(), props),
  )
}
