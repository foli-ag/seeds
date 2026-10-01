import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export type StepsProgressProps<As extends ValidComponent = "div"> = PartProps<As>

/** Exposes the completed share as a progressbar and through `--percent` */
export function StepsProgress<As extends ValidComponent = "div">(props: StepsProgressProps<As>): Element {
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getProgressProps(), props),
  )
}
