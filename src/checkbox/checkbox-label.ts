import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useCheckboxContext } from "./use-checkbox-context.js"

export interface CheckboxLabelProps extends PartProps<"span"> {}

export function CheckboxLabel(props: CheckboxLabelProps): Element {
  const api = useCheckboxContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
