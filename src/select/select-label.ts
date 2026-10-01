import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectLabelProps extends PartProps<"label"> {}

export function SelectLabel(props: SelectLabelProps): Element {
  const api = useSelectContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
