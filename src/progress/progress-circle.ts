import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useProgressContext } from "./use-progress-context.js"

export type ProgressCircleProps<As extends ValidComponent = "svg"> = PolymorphicProps<As>

/** The circular bar, which carries the progressbar role and is sized through `--size` and `--thickness` */
export function ProgressCircle<As extends ValidComponent = "svg">(props: ProgressCircleProps<As>): Element {
  const api = useProgressContext()
  return render(
    "svg",
    mergeProps(() => api().getCircleProps(), props),
  )
}
