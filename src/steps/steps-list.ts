import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export interface StepsListProps extends PartProps<"div"> {}

/** Holds the items */
export function StepsList(props: StepsListProps): Element {
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
