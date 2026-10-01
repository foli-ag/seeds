import { untrack, type Element } from "solid-js"
import { render, type PolymorphicProps, type ValidComponent } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseStepsReturn } from "./use-steps.js"
import { StepsProvider } from "./use-steps-context.js"

export type StepsRootProviderProps<As extends ValidComponent = "div"> = PolymorphicProps<As, { value: UseStepsReturn }>

/** A root for steps created with `useSteps` */
export function StepsRootProvider<As extends ValidComponent = "div">(props: StepsRootProviderProps<As>): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(StepsProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
