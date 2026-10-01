import * as steps from "@zag-js/steps"
import type { Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import { useSteps, type UseStepsProps } from "./use-steps.js"
import { StepsProvider } from "./use-steps-context.js"

export type StepsRootProps<As extends ValidComponent = "div"> = PolymorphicProps<As, UseStepsProps>

export function StepsRoot<As extends ValidComponent = "div">(props: StepsRootProps<As>): Element {
  const [stepsProps, localProps] = splitProps(props, steps.props)
  const api = useSteps(stepsProps)
  return provide(StepsProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
