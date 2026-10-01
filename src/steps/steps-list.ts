import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useStepsContext } from "./use-steps-context.js"

export type StepsListProps<As extends ValidComponent = "div"> = PartProps<As>

/** Holds the items */
export function StepsList<As extends ValidComponent = "div">(props: StepsListProps<As>): Element {
  const api = useStepsContext()
  return render(
    "div",
    mergeProps(() => api().getListProps(), props),
  )
}
