import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export type StepsCompletedContentProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Shown once every step is completed */
export function StepsCompletedContent<As extends ValidComponent = "div">(
  props: StepsCompletedContentProps<As>,
): Element {
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getContentProps({ index: api().count }), props),
  )
}
