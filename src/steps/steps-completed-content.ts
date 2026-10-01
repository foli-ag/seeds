import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export interface StepsCompletedContentProps extends PartProps<"div"> {}

/** Shown once every step is completed */
export function StepsCompletedContent(props: StepsCompletedContentProps): Element {
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getContentProps({ index: api().count }), props),
  )
}
