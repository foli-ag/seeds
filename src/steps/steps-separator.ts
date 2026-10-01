import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"
import { useStepsItemPropsContext } from "./use-steps-item-context.js"

export type StepsSeparatorProps<As extends ValidComponent = "div"> = PolymorphicProps<As>

/** Sits between the step around it and the next one */
export function StepsSeparator<As extends ValidComponent = "div">(props: StepsSeparatorProps<As>): Element {
  const api = useStepsContext()
  const itemProps = useStepsItemPropsContext()
  return render(
    "div",
    mergeProps(() => api().getSeparatorProps(itemProps), props),
  )
}
