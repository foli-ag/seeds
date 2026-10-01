import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export interface StepsTriggerPrevProps extends PartProps<"button"> {}

/** Goes to the previous step */
export function StepsTriggerPrev(props: StepsTriggerPrevProps): Element {
  const api = useStepsContext()
  return render(
    "button",
    mergeProps(() => api().getPrevTriggerProps(), props),
  )
}
