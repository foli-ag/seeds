import { untrack, type Element } from "solid-js"
import type { UseStepsReturn } from "./use-steps.js"
import { useStepsContext } from "./use-steps-context.js"

export interface StepsContextProps {
  children: (api: UseStepsReturn) => Element
}

/** Renders `children` with the steps' API */
export function StepsContext(props: StepsContextProps): Element {
  return untrack(() => props.children(useStepsContext()))
}
