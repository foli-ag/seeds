import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useCheckboxContext } from "./use-checkbox-context"

export interface CheckboxLabelProps extends PartProps<"span"> {}

export function CheckboxLabel(props: CheckboxLabelProps): Element {
  const api = useCheckboxContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
