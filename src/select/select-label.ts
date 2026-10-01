import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectLabelProps<As extends ValidComponent = "label"> = PartProps<As>

export function SelectLabel<As extends ValidComponent = "label">(props: SelectLabelProps<As>): Element {
  const api = useSelectContext()
  return render(
    "label",
    mergeProps(() => api().getLabelProps(), props),
  )
}
