import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCheckboxContext } from "./use-checkbox-context.js"

export interface CheckboxControlProps extends PartProps<"div"> {}

/** The box */
export function CheckboxControl(props: CheckboxControlProps): Element {
  const api = useCheckboxContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
