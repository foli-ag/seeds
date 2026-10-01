import type { Element } from "solid-js"
import { render, type PartProps } from "../utils/factory.js"
import { mergeProps } from "../utils/merge-props.js"
import { useSelectContext } from "./use-select-context.js"

export interface SelectControlProps extends PartProps<"div"> {}

/** Holds the trigger and the triggers around it */
export function SelectControl(props: SelectControlProps): Element {
  const api = useSelectContext()
  return render(
    "div",
    mergeProps(() => api().getControlProps(), props),
  )
}
