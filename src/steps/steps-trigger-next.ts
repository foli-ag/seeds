import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export interface StepsTriggerNextProps extends PartProps<"button"> {}

/** Goes to the next step */
export function StepsTriggerNext(props: StepsTriggerNextProps): Element {
  const api = useStepsContext()
  return render(
    "button",
    mergeProps(() => api().getNextTriggerProps(), props),
  )
}
