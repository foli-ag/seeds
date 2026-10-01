import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"
import { useStepsItemPropsContext } from "./use-steps-item-context.js"

export type StepsItemTriggerProps<As extends ValidComponent = "button"> = PartProps<As>

/** Goes to the step around it */
export function StepsItemTrigger<As extends ValidComponent = "button">(props: StepsItemTriggerProps<As>): Element {
  const api = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  return render(
    "button",
    mergeProps(() => api().getTriggerProps(itemProps), props),
  )
}
