import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressCircleTrackProps<As extends ValidComponent = "circle"> = PolymorphicProps<As>

/** The full ring behind the range */
export function ProgressCircleTrack<As extends ValidComponent = "circle">(
  props: ProgressCircleTrackProps<As>,
): Element {
  const api = useProgressContext()
  return render(
    "circle",
    mergeProps(() => api().getCircleTrackProps(), props),
  )
}
