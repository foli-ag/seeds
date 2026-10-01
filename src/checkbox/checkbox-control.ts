import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useCheckboxContext } from "./use-checkbox-context"

export interface CheckboxControlProps extends PartProps<"div"> {}

/** The box */
export function CheckboxControl(props: CheckboxControlProps): Element {
  const api = useCheckboxContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
