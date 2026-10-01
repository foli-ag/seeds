import type { Element } from "solid-js"
import { render, type PartProps, type ValidComponent } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export type SelectControlProps<As extends ValidComponent = "div"> = PartProps<As>

/** Holds the trigger and the triggers around it */
export function SelectControl<As extends ValidComponent = "div">(props: SelectControlProps<As>): Element {
  const api = useSelectContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
