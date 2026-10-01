import { untrack, type Element } from "solid-js"
import { useStepsItemContext, type UseStepsItemContext } from "./use-steps-item-context.js"

export interface StepsItemContextProps {
  children: (item: UseStepsItemContext) => Element
}

/** Renders `children` with the state of the step around it */
export function StepsItemContext(props: StepsItemContextProps): Element {
  return untrack(() => props.children(useStepsItemContext()))
}
