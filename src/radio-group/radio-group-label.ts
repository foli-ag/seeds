import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory"
import { mergeProps } from "../utils/merge-props"
import { useRadioGroupContext } from "./use-radio-group-context"

export interface RadioGroupLabelProps extends PartProps<"span"> {}

/** Names the group */
export function RadioGroupLabel(props: RadioGroupLabelProps): Element {
  const api = useRadioGroupContext()
  return render(
    "span",
    mergeProps(() => api().getLabelProps(), props),
  )
}
