import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"
import { useStepsItemPropsContext } from "./use-steps-item-context.js"

export interface StepsIndicatorProps extends PartProps<"div"> {}

/** Marks the step around it as current, complete or incomplete */
export function StepsIndicator(props: StepsIndicatorProps): Element {
  const api = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getIndicatorProps(itemProps), props),
  )
}
