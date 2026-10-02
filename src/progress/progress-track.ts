import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressTrackProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** The linear bar, which carries the progressbar role and holds the range */
export function ProgressTrack<As extends ValidComponent = "div">(props: ProgressTrackProps<As>): Element {
  const api = useProgressContext()
  return render(
    "div",
    mergeProps(() => api().getTrackProps(), props),
  )
}
