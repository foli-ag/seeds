import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export type StepsTriggerNextProps<As extends ValidComponent = "button"> = PartProps<As>

/** Goes to the next step */
export function StepsTriggerNext<As extends ValidComponent = "button">(props: StepsTriggerNextProps<As>): Element {
  const api = useStepsContext()
  return render(
    "button",
    mergeProps(() => api().getNextTriggerProps(), props),
  )
}
