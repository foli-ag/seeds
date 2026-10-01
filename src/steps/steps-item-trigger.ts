import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"
import { useStepsItemPropsContext } from "./use-steps-item-context.js"

export interface StepsItemTriggerProps extends PartProps<"button"> {}

/** Goes to the step around it */
export function StepsItemTrigger(props: StepsItemTriggerProps): Element {
  const api = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(itemProps), props),
  )
}
