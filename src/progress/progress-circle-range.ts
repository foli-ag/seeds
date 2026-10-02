import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressCircleRangeProps<As extends ValidComponent = "circle"> = PolymorphicProps<As>

/** The arc of the ring that the value fills, starting at the top */
export function ProgressCircleRange<As extends ValidComponent = "circle">(
  props: ProgressCircleRangeProps<As>,
): Element {
  const api = useProgressContext()
  return render(
    "circle",
    mergeProps(() => api().getCircleRangeProps(), props),
  )
}
