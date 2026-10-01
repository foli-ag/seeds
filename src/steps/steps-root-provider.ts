import { untrack, type Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { provide } from "../utils/flow.js"
import { mergeProps } from "../utils/merge-props.js"
import { splitProps } from "../utils/split-props.js"
import type { UseStepsReturn } from "./use-steps.js"
import { StepsProvider } from "./use-steps-context.js"

export interface StepsRootProviderProps extends PartProps<"div", { value: UseStepsReturn }> {}

/** A root for steps created with `useSteps` */
export function StepsRootProvider(props: StepsRootProviderProps): Element {
  const [, localProps] = splitProps(props, ["value"])
  const api = untrack(() => props.value)
  return provide(StepsProvider, api, () =>
    render(
      "div",
      mergeProps(() => api().getRootProps(), localProps),
    ),
  )
}
