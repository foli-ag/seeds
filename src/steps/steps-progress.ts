import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export interface StepsProgressProps extends PartProps<"div"> {}

/** Exposes the completed share as a progressbar and through `--percent` */
export function StepsProgress(props: StepsProgressProps): Element {
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getProgressProps(), props),
  )
}
