import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"
import { useStepsItemPropsContext } from "./use-steps-item-context.js"

export interface StepsSeparatorProps extends PartProps<"div"> {}

/** Sits between the step around it and the next one */
export function StepsSeparator(props: StepsSeparatorProps): Element {
  const api = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getSeparatorProps(itemProps), props),
  )
}
