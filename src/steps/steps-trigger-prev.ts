import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export type StepsTriggerPrevProps<As extends ValidComponent = "button"> = PartProps<As>

/** Goes to the previous step */
export function StepsTriggerPrev<As extends ValidComponent = "button">(props: StepsTriggerPrevProps<As>): Element {
  const api = useStepsContext()
  return render(
    "button",
    mergeProps(() => api().getPrevTriggerProps(), props),
  )
}
